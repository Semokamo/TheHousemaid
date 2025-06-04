
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
const MUSIC_LOOP_POINT = 75; // seconds

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
  
  const [isInitialCheckComplete, setIsInitialCheckComplete] = useState<boolean>(false);

  const [pagination, setPagination] = useState<PaginationState>(initialPaginationState);
  const [isSettingsBarVisible, setIsSettingsBarVisible] = useState<boolean>(false); 

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(false); // Default to unmuted
  const [userInteractedOnce, setUserInteractedOnce] = useState<boolean>(false); 

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
      // Clean up listeners once interaction occurs
      document.removeEventListener('click', handleFirstInteraction, { capture: true });
      document.removeEventListener('touchstart', handleFirstInteraction, { capture: true });
    };

    if (!userInteractedOnce) {
      document.addEventListener('click', handleFirstInteraction, { capture: true, once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { capture: true, once: true });
    }

    return () => {
      // Ensure cleanup if component unmounts before interaction
      document.removeEventListener('click', handleFirstInteraction, { capture: true });
      document.removeEventListener('touchstart', handleFirstInteraction, { capture: true });
    };
  }, [userInteractedOnce]);


  // Effect to control music play/pause based on interaction and mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (userInteractedOnce && !isMusicMuted) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn("Audio play prevented by browser policy:", e);
            // If autoplay is blocked, user might need to interact again or unmute/mute.
            // UI could reflect this if necessary.
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [userInteractedOnce, isMusicMuted, gameState]); // gameState included to re-evaluate if audio element context changes

  // Effect to handle music looping
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        if (userInteractedOnce && !isMusicMuted && !audio.paused && audio.currentTime >= MUSIC_LOOP_POINT) {
          audio.currentTime = 0;
          audio.play().catch(e => console.warn("Audio play on loop prevented:", e));
        }
      };
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [userInteractedOnce, isMusicMuted, MUSIC_LOOP_POINT]);

  const geminiService = useMemo(() => {
    if (!ENABLE_IMAGE_GENERATION) {
      setIsInitialCheckComplete(true); // Mark check as complete, no API key needed
      return null;
    }

    // Image generation IS enabled, API key IS required
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      try {
        const service = new GeminiService(apiKey);
        setIsInitialCheckComplete(true); // Mark check as complete
        return service;
      } catch (e) {
        console.error("Failed to initialize GeminiService:", e);
        setError(`Error initializing AI services: ${e instanceof Error ? e.message : 'Unknown error'}`);
        setGameState('error_apikey'); // Set error state
        setIsInitialCheckComplete(true); // Mark check as complete
        return null;
      }
    } else {
      // API key is required but not found
      setError("API Key not found. Image generation is enabled and requires an API Key. Please configure it or disable image generation in constants.ts.");
      setGameState('error_apikey'); // Set error state
      setIsInitialCheckComplete(true); // Mark check as complete
      return null;
    }
  }, []); 


  const resetPaginationStates = () => {
    setPagination(initialPaginationState);
  };

  const displayCurrentPageFromPagination = useCallback(async () => {
    if (!pagination.isPaginating || !pagination.finalNodeOfSequence || pagination.pages.length === 0) {
      setIsLoading(false); 
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
          setIsLoading(true); 
          const imageUrl = await geminiService.generateImageForScene(currentPageData.imagePromptSeed);
          setCurrentImageUrl(imageUrl);
        } catch (imgError) {
          console.error("Image generation error for page:", imgError);
          setCurrentImageUrl(`https://picsum.photos/seed/${encodeURIComponent(currentPageData.imagePromptSeed.substring(0,20))}/600/400?blur=2&grayscale&random=${Math.random()}`);
        } finally {
          // setIsLoading(false); // Handled by the outer setIsLoading(false)
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
    } else if (!pagination.isPaginating && isLoading && !isPerformingRewindFetch) {
        // This condition might indicate an unhandled loading state.
        // For now, assume other logic correctly sets isLoading to false.
    }
  }, [pagination, displayCurrentPageFromPagination, isLoading, isPerformingRewindFetch]);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [pagination.currentPageIndex, currentStory?.sceneId]); 

  useEffect(() => {
    if (isInitialCheckComplete && gameState === 'loading' && currentSceneIdForProgression && !pagination.isPaginating) {
      fetchAdventureNode(currentSceneIdForProgression);
    }
  }, [isInitialCheckComplete, gameState, currentSceneIdForProgression, fetchAdventureNode, geminiService, pagination.isPaginating]);


  const startGame = () => {
    if (ENABLE_IMAGE_GENERATION && !geminiService) {
      if (gameState !== 'error_apikey') { 
        setError("Cannot start game: API Key is required for image generation but is missing or invalid.");
        setGameState('error_apikey');
      }
      return;
    }

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
  
  if (!isInitialCheckComplete) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <LoadingIndicator text="Initializing Systems..." />
      </div>
    );
  }

  if (gameState === 'error_apikey') { 
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
            The Housemaid
          </h1>
        </header>
        <div className="w-full max-w-xl p-6 sm:p-8 my-8 text-center bg-black bg-opacity-70 rounded-xl shadow-xl border-2 border-red-700">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-red-400">Configuration Issue</h2>
          <p className="text-lg text-gray-200">{error || "An unexpected error occurred with AI services."}</p>
          {error && error.toLowerCase().includes("api key") && ENABLE_IMAGE_GENERATION && (
             <p className="text-sm text-gray-400 mt-4">
              You can set <code className="bg-gray-700 px-1 rounded">ENABLE_IMAGE_GENERATION</code> to <code className="bg-gray-700 px-1 rounded mx-px">false</code> in <code className="bg-gray-700 px-1 rounded mx-px">constants.ts</code> to play the story without images.
            </p>
          )}
           <div className="mt-6">
            <ActionButton
              text="Return to Menu"
              onClick={returnToMenu}
              className="bg-gray-600 hover:bg-gray-500 text-white w-auto px-6 py-2"
            />
          </div>
        </div>
      </div>
    );
  }


  if (gameState === 'menu') {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
         <audio ref={audioRef} src={MUSIC_URL} preload="auto" loop={false} /> {/* Loop handled by effect */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-500 animate-pulse">
            The Housemaid
          </h1>
          {!userInteractedOnce && (
             <p className="text-gray-400 mt-4 text-lg">Tap anywhere to immerse yourself.</p>
          )}
          {userInteractedOnce && (
             <p className="text-gray-400 mt-4 text-lg">The house holds its breath. Your choices define the silence.</p>
          )}
        </header>
        <main className="w-full max-w-sm">
          {userInteractedOnce && ( 
            <ActionButton
              text="Begin Chapter 1"
              onClick={startGame}
              className="bg-red-700 hover:bg-red-800 border-2 border-red-900 text-white focus:ring-red-500 py-4 text-xl"
            />
          )}
        </main>
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Story inspired by The Housemaid by Freida McFadden. App by Moe.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center p-4 sm:p-6">
       <audio ref={audioRef} src={MUSIC_URL} preload="auto" loop={false} /> {/* Loop handled by effect */}
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
