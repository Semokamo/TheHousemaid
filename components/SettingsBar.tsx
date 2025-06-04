
import React from 'react';
import ActionButton from './ActionButton';

interface SettingsBarProps {
  onClose: () => void;
  onResetChapter: () => void;
  isMusicMuted: boolean;
  onToggleMusicMute: () => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ 
    onClose, 
    onResetChapter, 
    isMusicMuted, 
    onToggleMusicMute 
}) => {
  const handleReset = () => {
    onResetChapter();
    onClose(); // Close the bar after action
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-40 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Settings Panel */}
      <div 
        className={`fixed top-0 h-full w-full max-w-xs sm:max-w-sm bg-gray-800 shadow-xl z-50 
                   transform transition-transform duration-300 ease-in-out 
                   border-gray-700 flex flex-col p-6
                   left-0 border-r-2 ${true ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 id="settings-title" className="text-2xl font-semibold text-red-400">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-300 mb-2 text-sm">Game Progress:</p>
            <ActionButton
              text="Reset Chapter Progress"
              onClick={handleReset}
              className="bg-red-700 hover:bg-red-800 border-red-900 text-white focus:ring-red-500 w-full"
            />
            <p className="text-xs text-gray-500 mt-1">This will restart the current chapter from the beginning. Your overall path history for rewind will also be cleared.</p>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-300 mb-2 text-sm">Audio Settings:</p>
            <ActionButton
              text={isMusicMuted ? "Unmute Music" : "Mute Music"}
              onClick={onToggleMusicMute}
              className={`${
                isMusicMuted 
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                  : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
              } text-white w-full`}
            />
          </div>
          
        </div>
        <div className="mt-auto pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-600 text-center">Settings Panel</p>
        </div>
      </div>
    </>
  );
};

export default SettingsBar;
