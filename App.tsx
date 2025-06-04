
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StorySegment, Choice, StoryTreeNode } from './types';
import { GeminiService } from './services/geminiService';
import { START_NODE_ID, ENABLE_IMAGE_GENERATION } from './constants';
import { housemaidStoryData } from './storyTree';
import LoadingIndicator from './components/LoadingIndicator';
import ActionButton from './components/ActionButton';
import TimelineView from './components/TimelineView';
import SettingsBar from './components/SettingsBar';
import { marked } from 'marked';

type GameState = 'menu' | 'loading' | 'playing' | 'ended' | 'error_apikey';

type PageData = {
  description: string;
  imagePromptSeed: string;
  nodeId: string; 
};

type PaginationState = {
  isPaginating: boolean;
  pages: PageData[];
  currentPageIndex: number;
  finalNodeOfSequence: StoryTreeNode | null; 
};

const initialPaginationState: PaginationState = {
  isPaginating: false,
  pages: [],
  currentPageIndex: 0,
  finalNodeOfSequence: null,
};

const MUSIC_URL = "https://eta.vgmtreasurechest.com/soundtracks/alice-madness-returns/beihnoxxys/01.%20Main%20Theme.mp3";
const MUSIC_LOOP_POINT = 75;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentStory, setCurrentStory] = useState<StorySegment | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSceneIdForProgression, setCurrentSceneIdForProgression] = useState<string>(START_NODE_ID);
  
  const [gameplayPathHistory, setGameplayPathHistory] = useState<string[]>([]);
  const [maxAchievedHistory, setMaxAchievedHistory] = useState<string[]>([]);

  const [isTimelineVisible, setIsTimelineVisible] = useState<boolean>(false);
  const [isPerformingRewindFetch, setIsPerformingRewindFetch] = useState<boolean>(false);
  
  const [apiKeyChecked, setApiKeyChecked] = useState<boolean>(false);

  const [pagination, setPagination] = useState<PaginationState>(initialPaginationState);
  const [isSettingsBarVisible, setIsSettingsBarVisible] = useState<boolean>(false); 

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(false);
  const [userInteractedOnce, setUserInteractedOnce] = useState<boolean>(false); 
  const [isMusicPlayingOnMenu, setIsMusicPlayingOnMenu] = useState<boolean>(false);

  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteractedOnce) {
        setUserInteractedOnce(true);
      }
      // Clean up listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction, { capture: true });
      document.removeEventListener('touchstart', handleFirstInteraction, { capture: true });
    };

    if (!userInteractedOnce) {
      document.addEventListener('click', handleFirstInteraction, { capture: true, once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { capture: true, once: true });
    }

    return () => {
      // Ensure listeners are removed if component unmounts before interaction
      document.removeEventListener('click', handleFirstInteraction, { capture: true });
      document.removeEventListener('touchstart', handleFirstInteraction, { capture: true });
    };
  }, [userInteractedOnce]);


  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (userInteractedOnce && gameState === 'menu' && !isMusicMuted) {
        audio.play()
          .then(() => {
            setIsMusicPlayingOnMenu(true);
          })
          .catch(e => {
            console.warn("Menu audio play prevented:", e);
            setIsMusicPlayingOnMenu(false); // Explicitly set if play fails
          });
      } else {
        audio.pause();
        setIsMusicPlayingOnMenu(false); 
      }
    }
  }, [userInteractedOnce, gameState, isMusicMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        if (isMusicPlayingOnMenu && !audio.paused && audio.currentTime >= MUSIC_LOOP_POINT) {
          audio.currentTime = 0;
          audio.play().catch(e => console.warn("Audio play on loop prevented:", e));
        }
      };
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [isMusicPlayingOnMenu]); // Depends on music actually playing on menu

  const geminiService = useMemo(() => {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      setApiKeyChecked(true);
      return new GeminiService(apiKey);
    }
    setApiKeyChecked(true); 
    setGameState('error_apikey');
    setError("API Key not found. This application requires an API Key for AI services to function. Please ensure it's configured correctly in your environment.");
    return null;
  }, []);

  const resetPaginationStates = () => {
    setPagination(initialPaginationState);
  };

  const displayCurrentPageFromPagination = useCallback(async () => {
    if (!pagination.isPaginating || !pagination.finalNodeOfSequence || pagination.pages.length === 0) {
      return;
    }
    
    const currentPageData = pagination.pages[pagination.currentPageIndex];
    const isLastPage = pagination.currentPageIndex === pagination.pages.length - 1;
    const finalNode = pagination.finalNodeOfSequence;

    setCurrentStory({
      sceneId: currentPageData.nodeId,
      sceneDescription: currentPageData.description,
      imagePrompt: currentPageData.imagePromptSeed, 
      choices: isLastPage ? finalNode.choices.map(c => ({ text: c.text, nextSceneId: c.nextSceneId })) : [],
      gameOver: isLastPage ? !!finalNode.isEnding : false,
      gameWin: isLastPage ? (!!finalNode.isEnding && finalNode.endingType === 'win') : false,
      message: isLastPage ? finalNode.message : undefined,
      endingType: isLastPage ? (finalNode.isEnding ? finalNode.endingType : undefined) : undefined,
    });

    if (pagination.currentPageIndex === 0) { 
      if (ENABLE_IMAGE_GENERATION && geminiService && currentPageData.imagePromptSeed) {
        try {
          const imageUrl = await geminiService.generateImageForScene(currentPageData.imagePromptSeed);
          setCurrentImageUrl(imageUrl);
        } catch (imgError) {
          console.error("Image generation error for page:", imgError);
          setCurrentImageUrl(`https://picsum.photos/seed/${encodeURIComponent(currentPageData.imagePromptSeed.substring(0,20))}/600/400?blur=2&grayscale&random=${Math.random()}`);
        }
      } else if (currentPageData.imagePromptSeed) {
        setCurrentImageUrl(`https://picsum.photos/seed/${encodeURIComponent(currentPageData.imagePromptSeed.substring(0,20))}/600/400?grayscale&blur=1&random=${Math.random()}`);
      } else {
        setCurrentImageUrl(null);
      }
    } else {
        setCurrentImageUrl(null); 
    }
    
    setIsLoading(false);

  }, [pagination, geminiService]);


  const fetchAdventureNode = useCallback(async (initialSceneIdInChain: string) => {
    setIsLoading(true); 
    setError(null);
    setCurrentImageUrl(null); 

    const isRewindContextFetch = isPerformingRewindFetch;
    let finalNodeForDisplay: StoryTreeNode | null = null; 
    const newPages: PageData[] = [];

    try {
      if (isRewindContextFetch) {
        const targetRewindNodeId = initialSceneIdInChain;
        const targetNode = housemaidStoryData[targetRewindNodeId];
        
        if (!targetNode) {
          throw new Error(`Rewind target node "${targetRewindNodeId}" not found.`);
        }
        finalNodeForDisplay = targetNode; 

        let previousDecisionNodeIdInMax: string | undefined = undefined;
        const targetIndexInMax = maxAchievedHistory.indexOf(targetRewindNodeId);

        if (targetIndexInMax > 0) {
            previousDecisionNodeIdInMax = maxAchievedHistory[targetIndexInMax - 1];
        } else if (targetIndexInMax === 0 && targetRewindNodeId !== START_NODE_ID) {
             if (housemaidStoryData[START_NODE_ID]?.choices.some(c => c.nextSceneId === targetRewindNodeId)) {
                 previousDecisionNodeIdInMax = START_NODE_ID;
             }
        }
        
        if (previousDecisionNodeIdInMax) {
            const prevDecisionNodeData = housemaidStoryData[previousDecisionNodeIdInMax];
            if (prevDecisionNodeData) {
                let chosenPathContinuationId: string | undefined = undefined;
                
                for (const choice of prevDecisionNodeData.choices) {
                    let pathTracerId = choice.nextSceneId;
                    let pathFound = false;
                    const visitedInTrace = new Set<string>(); 
                    while(pathTracerId && !visitedInTrace.has(pathTracerId)) {
                        visitedInTrace.add(pathTracerId);
                        if (pathTracerId === targetRewindNodeId) {
                            chosenPathContinuationId = choice.nextSceneId; 
                            pathFound = true;
                            break;
                        }
                        const intermediateNode = housemaidStoryData[pathTracerId];
                        if (!intermediateNode || intermediateNode.choices.length !== 1) break; 
                        pathTracerId = intermediateNode.choices[0].nextSceneId;
                    }
                    if (pathFound) break;
                }

                if (chosenPathContinuationId) {
                    let nextIdCandidate = chosenPathContinuationId;
                    while(nextIdCandidate && nextIdCandidate !== targetRewindNodeId) {
                        const intermediateNode = housemaidStoryData[nextIdCandidate];
                        if (!intermediateNode) break; 
                        newPages.push({
                          description: intermediateNode.scenePromptForGemini,
                          imagePromptSeed: intermediateNode.imagePromptSeed,
                          nodeId: intermediateNode.id
                        });
                        if (intermediateNode.choices.length !== 1) break; 
                        nextIdCandidate = intermediateNode.choices[0].nextSceneId;
                    }
                }
            }
        }
        newPages.push({
          description: targetNode.scenePromptForGemini,
          imagePromptSeed: targetNode.imagePromptSeed,
          nodeId: targetNode.id
        });

        setPagination({
            isPaginating: true,
            pages: newPages,
            currentPageIndex: newPages.length > 0 ? newPages.length - 1 : 0, 
            finalNodeOfSequence: finalNodeForDisplay,
        });
        
      } else { 
        let currentNodeIdInChain = initialSceneIdInChain;
        
        while (true) {
          const node: StoryTreeNode | undefined = housemaidStoryData[currentNodeIdInChain];

          if (!node) {
            setError(`Critical Error: Story node id "${currentNodeIdInChain}" not found. Adventure corrupted.`);
            setCurrentStory({ 
                sceneId: currentNodeIdInChain, sceneDescription: `Error: Story sequence broken. Node "${currentNodeIdInChain}" is missing.`, 
                imagePrompt: "error", choices: [], gameOver: true, gameWin: false, message: "Fatal error.", endingType: 'lose'
            });
            setGameState('ended');
            setIsLoading(false); 
            return;
          }
          
          newPages.push({
            description: node.scenePromptForGemini,
            imagePromptSeed: node.imagePromptSeed,
            nodeId: node.id
          });
          finalNodeForDisplay = node;

          if (node.isEnding || node.choices.length !== 1) {
            break; 
          }
          
          const nextNodeId = node.choices[0].nextSceneId;
          if (!nextNodeId) { 
              console.warn(`Node ${node.id} has one choice but no nextSceneId. Ending chain.`);
              break;
          }
          currentNodeIdInChain = nextNodeId;
        }
         setPagination({
            isPaginating: true,
            pages: newPages,
            currentPageIndex: 0, 
            finalNodeOfSequence: finalNodeForDisplay,
        });
      }

      if (!finalNodeForDisplay) { 
        throw new Error("Failed to determine a final node for display.");
      }
      
      setCurrentSceneIdForProgression(finalNodeForDisplay.id); 
      setGameState(finalNodeForDisplay.isEnding ? 'ended' : 'playing');

    } catch (storyError) {
      console.error("Error processing story node chain:", storyError);
      setError(`Failed to process scene sequence: ${storyError instanceof Error ? storyError.message : 'Unknown error'}.`);
      const errorNodeId = finalNodeForDisplay?.id || initialSceneIdInChain;
      setCurrentStory({ 
          sceneId: errorNodeId, sceneDescription: "An error occurred.", imagePrompt: "error", 
          choices: [], gameOver: true, gameWin: false, message: `Error loading story.`, endingType: 'lose'
      });
      setGameState('ended'); 
      setIsLoading(false); 
    } finally {
      if (isRewindContextFetch) { 
        setIsPerformingRewindFetch(false); 
      }
    }
  }, [isPerformingRewindFetch, maxAchievedHistory, geminiService]); 

  useEffect(() => {
    if (pagination.isPaginating && pagination.pages.length > 0 && pagination.finalNodeOfSequence) {
      displayCurrentPageFromPagination();
    } else if (!pagination.isPaginating && isLoading) { 
        // This specific condition was causing issues with rewind loading.
        // If we are not paginating, but isLoading is true (e.g., after a rewind initiated `fetchAdventureNode`),
        // and `displayCurrentPageFromPagination` didn't run (because `isPaginating` was false then),
        // the `isLoading` might not be turned off by `displayCurrentPageFromPagination`.
        // However, fetchAdventureNode itself now handles setting isLoading to false in its finally block
        // if it's a rewind context, or `displayCurrentPageFromPagination` handles it for normal flow.
        // This else-if might be redundant or handled better by ensuring `isLoading` is false after `fetchAdventureNode` finishes in all cases.
        // Let's verify if `displayCurrentPageFromPagination`'s `setIsLoading(false)` is robust enough.
        // The issue was more likely that `displayCurrentPageFromPagination` itself was not correctly
        // setting isLoading to false after a rewind if it was displaying a page that wasn't the *first*
        // of the reconstructed sequence. This was addressed by ensuring `displayCurrentPageFromPagination` *always* sets `isLoading = false`.
    }
  }, [pagination, displayCurrentPageFromPagination, isLoading]);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [pagination.currentPageIndex, currentStory?.sceneId]); 

  useEffect(() => {
    if (!geminiService && apiKeyChecked && !process.env.API_KEY) {
        setGameState('error_apikey');
        setError("API Key not found. This application requires an API Key for AI services to function. Please ensure it's configured correctly in your environment.");
        setIsLoading(false); 
        return;
    }

    if (gameState === 'loading' && apiKeyChecked && currentSceneIdForProgression && !pagination.isPaginating) {
      fetchAdventureNode(currentSceneIdForProgression);
    }
  }, [currentSceneIdForProgression, gameState, fetchAdventureNode, apiKeyChecked, geminiService, pagination.isPaginating]);


  const startGame = () => {
    setGameplayPathHistory([]); 
    setMaxAchievedHistory([]); 
    setCurrentSceneIdForProgression(START_NODE_ID);
    setCurrentStory(null);
    setCurrentImageUrl(null);
    setError(null);
    setIsTimelineVisible(false);
    setIsPerformingRewindFetch(false); 
    resetPaginationStates();
    setIsSettingsBarVisible(false); 
    setGameState('loading'); 
  };

  const handlePlayerChoice = (choice: Choice) => {
    if (isLoading || !choice.nextSceneId || gameState === 'loading') return;
    
    const currentEffectiveSceneId = pagination.finalNodeOfSequence?.id || currentSceneIdForProgression;

    const newGameplayHistory = [...gameplayPathHistory];
    if (currentEffectiveSceneId && !newGameplayHistory.includes(currentEffectiveSceneId)) { 
      newGameplayHistory.push(currentEffectiveSceneId);
    }
    setGameplayPathHistory(newGameplayHistory); 
    
    if (newGameplayHistory.length >= maxAchievedHistory.length) {
       if (newGameplayHistory.length > maxAchievedHistory.length || 
           !newGameplayHistory.every((val, index) => val === maxAchievedHistory[index])) {
           setMaxAchievedHistory(newGameplayHistory);
       }
    }
    
    resetPaginationStates(); 

    setCurrentSceneIdForProgression(choice.nextSceneId); 
    setIsPerformingRewindFetch(false); 
    setGameState('loading');
  };

  const handleRewindToScene = (targetSceneId: string) => {
    if (isLoading || gameState === 'loading') return;
    
    const targetIndexInMaxHistory = maxAchievedHistory.indexOf(targetSceneId);
    
    let newGameplayHistoryForRewind: string[];
    if (targetSceneId === START_NODE_ID) { 
        newGameplayHistoryForRewind = [];
    } else if (targetIndexInMaxHistory !== -1) { 
        newGameplayHistoryForRewind = maxAchievedHistory.slice(0, targetIndexInMaxHistory);
    } else { 
        console.warn("Target scene for rewind not in maxAchievedHistory. Defaulting to empty history.", targetSceneId, maxAchievedHistory);
        newGameplayHistoryForRewind = []; 
    }
    
    setGameplayPathHistory(newGameplayHistoryForRewind);
    setCurrentSceneIdForProgression(targetSceneId); 
    
    resetPaginationStates(); 
    setIsPerformingRewindFetch(true); 
    
    setGameState('loading');
    setIsTimelineVisible(false);
  };

  const returnToMenu = () => {
    resetPaginationStates();
    setIsSettingsBarVisible(false);
    setCurrentStory(null); 
    setCurrentImageUrl(null); 
    setError(null); 
    setIsLoading(false); 
    setGameState('menu');
  };

  const handleNextPage = () => {
    if (pagination.currentPageIndex < pagination.pages.length - 1) {
      setPagination(prev => ({ ...prev, currentPageIndex: prev.currentPageIndex + 1 }));
    }
  };

  const handlePreviousPage = () => {
     if (pagination.currentPageIndex > 0) {
      setPagination(prev => ({ ...prev, currentPageIndex: prev.currentPageIndex - 1 }));
    }
  };
  
  const toggleSettingsBar = () => {
    setIsSettingsBarVisible(prev => !prev);
  };

  const toggleMusicMute = () => {
    setIsMusicMuted(prev => !prev);
  };
  
  if (gameState === 'error_apikey' || (gameState === 'menu' && !apiKeyChecked && !process.env.API_KEY)) {
    if (!apiKeyChecked && !isLoading) { 
        return <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
            <LoadingIndicator text="Initializing Systems..."/>
        </div>;
    }
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
            The Housemaid
          </h1>
        </header>
        <div className="w-full max-w-xl p-6 sm:p-8 my-8 text-center bg-black bg-opacity-70 rounded-xl shadow-xl border-2 border-red-700">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-red-400">A Key is Missing</h2>
          <p className="text-lg text-gray-200">{error || "The story remains untold without a valid API Key. Please configure it to begin."}</p>
        </div>
      </div>
    );
  }

  if (gameState === 'menu') {
    if (!isMusicPlayingOnMenu) {
      return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
          <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
          <header className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-500 animate-pulse">
              The Housemaid
            </h1>
          </header>
          <main className="w-full max-w-sm text-center">
            {!userInteractedOnce ? (
              <p className="text-gray-400 mt-4 text-lg">Tap anywhere to immerse yourself.</p>
            ) : (
              <LoadingIndicator text="Setting the scene..." />
            )}
          </main>
          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>Story inspired by The Housemaid by Freida McFadden. App by Moe.</p>
          </footer>
        </div>
      );
    }
    // Else (isMusicPlayingOnMenu is true), render the actual menu
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
         <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-500 animate-pulse">
            The Housemaid
          </h1>
          <p className="text-gray-400 mt-4 text-lg">The house holds its breath. Your choices define the silence.</p>
        </header>
        <main className="w-full max-w-sm">
          <ActionButton
            text="Begin Chapter 1"
            onClick={startGame}
            className="bg-red-700 hover:bg-red-800 border-2 border-red-900 text-white focus:ring-red-500 py-4 text-xl"
          />
        </main>
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Story inspired by The Housemaid by Freida McFadden. App by Moe.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center p-4 sm:p-6">
       <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      <header className="w-full max-w-3xl mb-6 sm:mb-8 flex justify-between items-center">
        <button 
          onClick={toggleSettingsBar} 
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          aria-label="Open settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-center mx-auto px-4">
          The Housemaid
        </h1>
        <div className="w-7 h-7"></div> 
      </header>

      {isSettingsBarVisible && (
        <SettingsBar 
            onClose={toggleSettingsBar} 
            onResetChapter={() => {
                startGame(); 
            }} 
            isMusicMuted={isMusicMuted}
            onToggleMusicMute={toggleMusicMute}
        />
      )}

      {isTimelineVisible && (
        <TimelineView
          history={maxAchievedHistory} 
          storyTree={housemaidStoryData}
          onRewind={handleRewindToScene}
          onClose={() => setIsTimelineVisible(false)}
          currentSceneId={currentSceneIdForProgression} 
        />
      )}

      <main ref={mainContentRef} className="w-full max-w-3xl bg-gray-800 shadow-2xl rounded-xl p-5 sm:p-8 border-2 border-gray-700 overflow-y-auto" style={{maxHeight: 'calc(100vh - 150px)'}}>
        {isLoading && <LoadingIndicator text={isPerformingRewindFetch ? "Recalling past moments..." : (pagination.isPaginating && pagination.currentPageIndex > 0 ? "Turning the page..." : "The story unfolds...")} />}
        
        {!isLoading && error && (
          <div className="text-red-300 p-4 bg-red-900 bg-opacity-70 rounded-md text-center mb-6 border border-red-600">
            <p className="font-semibold text-lg">A Disturbance in the Narrative:</p>
            <p>{error}</p>
            <ActionButton text="Return to Start" onClick={returnToMenu} className="mt-4 bg-gray-600 hover:bg-gray-500 text-white" />
          </div>
        )}
        
        {!isLoading && !error && currentStory && (
          <>
            {currentImageUrl && (
              <div className="mb-6 aspect-video w-full bg-black rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-700 shadow-lg">
                <img src={currentImageUrl} alt={currentStory.imagePrompt || "A scene from the house"} className="object-cover h-full w-full" />
              </div>
            )}

            <div 
              className={`prose prose-invert prose-lg max-w-none mb-3 text-gray-200 leading-relaxed whitespace-pre-line p-4 bg-black rounded-md border border-gray-700
                          ${pagination.isPaginating && pagination.currentPageIndex < pagination.pages.length - 1 ? 'text-gray-400 opacity-80' : 'text-gray-100'}`}
              style={{fontFamily: "'Georgia', 'Times New Roman', serif'"}}
              dangerouslySetInnerHTML={{ __html: marked.parse(currentStory.sceneDescription) as string }}
            />

            {pagination.isPaginating && pagination.pages.length > 1 && (
                <div className="mt-6 mb-4 flex justify-between items-center">
                    <ActionButton
                        text="Previous Page"
                        onClick={handlePreviousPage}
                        disabled={pagination.currentPageIndex === 0 || isLoading} 
                        className="bg-gray-600 hover:bg-gray-500 text-white w-auto px-4 py-2 text-sm"
                    />
                    <p className="text-gray-400 text-sm">
                        Page {pagination.currentPageIndex + 1} of {pagination.pages.length}
                    </p>
                    <ActionButton
                        text="Next Page"
                        onClick={handleNextPage}
                        disabled={pagination.currentPageIndex === pagination.pages.length - 1 || isLoading} 
                        className="bg-gray-600 hover:bg-gray-500 text-white w-auto px-4 py-2 text-sm"
                    />
                </div>
            )}

            {(!pagination.isPaginating || (pagination.isPaginating && pagination.currentPageIndex === pagination.pages.length - 1)) && !currentStory.gameOver && (
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mt-6">
                {currentStory.choices.map((choice, index) => (
                  <ActionButton
                    key={`choice-${index}-${currentStory.sceneId || 'no-id'}-${choice.text.slice(0,5)}`} 
                    text={choice.text}
                    onClick={() => handlePlayerChoice(choice)}
                    disabled={isLoading}
                    className="bg-red-700 hover:bg-red-800 border-red-900 border-2 text-white focus:ring-red-600"
                  />
                ))}
              </div>
            )}

            {currentStory.message && currentStory.gameOver && (
              <p 
                  className={`text-md italic mt-6 mb-2 p-3 rounded-md border ${
                      currentStory.endingType === 'win' ? 'bg-green-900 bg-opacity-50 border-green-700 text-green-300' : 
                      currentStory.endingType === 'neutral' ? 'bg-yellow-900 bg-opacity-50 border-yellow-700 text-yellow-300' :
                      currentStory.endingType === 'lose' ? 'bg-red-900 bg-opacity-50 border-red-700 text-red-300' :
                      'bg-gray-700 bg-opacity-30 border-gray-600 text-gray-300' 
                  }`}
              >
                {currentStory.message}
              </p>
            )}
            
            {(gameState === 'playing' && currentStory && !currentStory.gameOver) && (
              <div className="my-6 border-t border-b border-gray-700 py-4 flex flex-col sm:flex-row gap-3 justify-center">
                {maxAchievedHistory.length > 0 && (
                    <ActionButton
                        text="Review Your Path / Rewind"
                        onClick={() => setIsTimelineVisible(true)}
                        disabled={isLoading}
                        className="bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400"
                    />
                )}
              </div>
            )}


            {gameState === 'ended' && currentStory.gameOver && (
              <div className="text-center mt-8">
                <p className={`text-2xl sm:text-3xl font-semibold mb-6 ${
                      currentStory.endingType === 'win' ? 'text-green-400' : 
                      currentStory.endingType === 'neutral' ? 'text-yellow-400' : 
                      'text-red-400' 
                  }`}>
                  {!currentStory.message && (currentStory.gameWin ? "CHAPTER COMPLETE" : (currentStory.endingType === 'neutral' ? "TO BE CONTINUED..." : "AN UNTIMELY END"))}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <ActionButton text="Return to Start" onClick={returnToMenu} className="bg-red-700 hover:bg-red-800 text-white"/>
                  {maxAchievedHistory.length > 0 && ( 
                       <ActionButton
                          text="Review Your Path"
                          onClick={() => setIsTimelineVisible(true)}
                          disabled={isLoading} 
                          className="bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400"
                      />
                  )}
                </div>
              </div>
            )}
          </>
        )}
         {!isLoading && !currentStory && !error && gameState === 'playing' && !pagination.isPaginating && ( 
           <div className="text-center p-8 text-gray-400">
              <p>The house waits...</p> 
           </div>
         )}
      </main>
      
       <footer className="mt-8 text-center text-sm text-gray-500">
            <p>Story inspired by The Housemaid by Freida McFadden. App by Moe.</p>
        </footer>
    </div>
  );
};

export default App;