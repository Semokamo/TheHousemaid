
import React from 'react';

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string; // Allow custom Tailwind classes
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, disabled, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full font-semibold py-3 px-6 rounded-lg shadow-md 
        transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none 
        focus:ring-2 focus:ring-opacity-75
        disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none
        ${className || 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'}
      `}
    >
      {text}
    </button>
  );
};

export default ActionButton;
