import React from 'react';

interface LoadingIndicatorProps {
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      <p className="mt-6 text-xl text-gray-300 tracking-wide">{text}</p>
    </div>
  );
};

export default LoadingIndicator;