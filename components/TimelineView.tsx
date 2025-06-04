
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { StoryTree } from '../types';
import ActionButton from './ActionButton';
import { START_NODE_ID } from '../constants'; 

interface TimelineViewProps {
  history: string[]; // This will be maxAchievedHistory from App.tsx
  storyTree: StoryTree;
  onRewind: (sceneId: string) => void;
  onClose: () => void;
  currentSceneId: string; 
}

const TimelineView: React.FC<TimelineViewProps> = ({ history, storyTree, onRewind, onClose, currentSceneId }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // pathForTimeline is derived from `history` (maxAchievedHistory)
  // It represents the sequence of decision points the player has encountered.
  const pathForTimeline = useMemo(() => {
    if (history.length === 0) {
      // This case should only happen at the very start of a new game,
      // before any choices are made from START_NODE_ID.
      return [START_NODE_ID];
    }
    // `history` (maxAchievedHistory) already contains the sequence like [S0, D1, D2...]
    // where S0 is START_NODE_ID if a choice was made from it.
    return history;
  }, [history]);
  
  const [selectedPathIndex, setSelectedPathIndex] = useState<number>(pathForTimeline.length - 1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const getPathNodeDetails = useCallback((index: number) => {
    if (index < 0 || index >= pathForTimeline.length) return null;
    const sceneId = pathForTimeline[index];
    return { id: sceneId, node: storyTree[sceneId] };
  }, [pathForTimeline, storyTree]);

  useEffect(() => {
    // When pathForTimeline changes (e.g. game starts, or maxAchievedHistory updates),
    // default selection to the last point of that path.
    setSelectedPathIndex(pathForTimeline.length - 1);
  }, [pathForTimeline]);

  const handleInteractionMove = useCallback((clientX: number) => {
    if (!timelineRef.current || pathForTimeline.length <= 1) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (clientX - timelineRect.left) / timelineRect.width));
    const newIndex = Math.round(progress * (pathForTimeline.length - 1));
    
    if (newIndex !== selectedPathIndex) {
      setSelectedPathIndex(newIndex);
    }
  }, [pathForTimeline.length, selectedPathIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (pathForTimeline.length <= 1 && history.length === 0) return; 
    e.preventDefault(); 
    setIsDragging(true);
    handleInteractionMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (pathForTimeline.length <= 1 && history.length === 0) return;
    setIsDragging(true);
    handleInteractionMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => isDragging && setIsDragging(false);
    const handleMouseMoveGlobal = (e: MouseEvent) => isDragging && handleInteractionMove(e.clientX);
    const handleTouchEndGlobal = () => isDragging && setIsDragging(false);
    const handleTouchMoveGlobal = (e: TouchEvent) => isDragging && handleInteractionMove(e.touches[0].clientX);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
      document.addEventListener('touchmove', handleTouchMoveGlobal);
      document.addEventListener('touchend', handleTouchEndGlobal);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('touchmove', handleTouchMoveGlobal);
      document.removeEventListener('touchend', handleTouchEndGlobal);
    };
  }, [isDragging, handleInteractionMove]);

  const handleRewindClick = () => {
    const selectedDetails = getPathNodeDetails(selectedPathIndex);
    if (selectedDetails) {
      onRewind(selectedDetails.id);
    }
  };
  
  const currentSelectedNodeDetailsOnTimeline = getPathNodeDetails(selectedPathIndex);
  
  // Show message if `history` (maxAchievedHistory) is empty.
  // This is only true at the very beginning of a new game session.
  if (history.length === 0) { 
     return (
       <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4 z-50 backdrop-blur-md">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md text-center border-2 border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Story Timeline</h2>
          <p className="text-gray-300 mb-6">Your adventure has just begun. No past choices to rewind to yet.</p>
          <ActionButton text="Close" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4 z-50 backdrop-blur-md">
      <div className="bg-gray-800 p-5 sm:p-8 rounded-xl shadow-2xl w-full max-w-xl flex flex-col border-2 border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Rewind Story</h2>

        <div className="mb-8 h-20 flex flex-col justify-center items-center">
            <p className="text-gray-400 text-sm mb-1">Selected Point ({selectedPathIndex + 1} / {pathForTimeline.length}):</p>
            <p className="text-lg text-red-400 font-semibold text-center truncate px-4" style={{minHeight: '28px'}}>
                {currentSelectedNodeDetailsOnTimeline?.node?.timelineTitle || `Scene ${selectedPathIndex + 1}`}
            </p>
        </div>

        <div className="relative flex items-center h-12 mb-8 px-4">
          <div
            ref={timelineRef}
            className="w-full h-2.5 bg-gray-600 rounded-full cursor-pointer relative"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {pathForTimeline.map((sceneId, index) => {
                const leftPercentage = pathForTimeline.length > 1 ? (index / (pathForTimeline.length - 1)) * 100 : 50;
                const isSelectedNode = index === selectedPathIndex;
                // Check if this timeline node corresponds to the actual current game scene
                const isCurrentGameSceneNode = sceneId === currentSceneId;

                return (
                    <button
                        key={sceneId + '-' + index}
                        className={`absolute w-3.5 h-3.5 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2
                                    transition-all duration-150 ease-in-out
                                    ${isSelectedNode ? 'bg-red-500 ring-2 ring-red-400 ring-offset-2 ring-offset-gray-800 scale-125' : 'bg-gray-400 hover:bg-red-400'}
                                    ${isCurrentGameSceneNode && !isSelectedNode ? 'border-2 border-white' : ''} 
                                    `}
                        style={{ left: `${leftPercentage}%` }}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setSelectedPathIndex(index);
                        }}
                        aria-label={`Go to step ${index + 1}: ${storyTree[sceneId]?.timelineTitle || ''}`}
                    />
                );
            })}
            {pathForTimeline.length > 1 && (
                 <div
                    className="absolute w-6 h-6 bg-red-600 rounded-full shadow-lg border-2 border-red-400 top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
                    style={{ 
                        left: `${pathForTimeline.length > 1 ? (selectedPathIndex / (pathForTimeline.length - 1)) * 100 : 50}%`,
                        touchAction: 'none' 
                    }}
                    onMouseDown={handleMouseDown} 
                    onTouchStart={handleTouchStart} 
                />
            )}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ActionButton 
            text="Rewind to Selected" 
            onClick={handleRewindClick}
            disabled={currentSelectedNodeDetailsOnTimeline?.id === currentSceneId} 
            className="bg-red-700 hover:bg-red-800 text-white focus:ring-red-500"
          />
          <ActionButton 
            text="Close Timeline" 
            onClick={onClose} 
            className="bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400" 
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
