import React from 'react';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ message, size = 'md' }) => {
  let spinnerSizeClasses = 'w-8 h-8';
  let textSizeClasses = 'text-lg';

  switch (size) {
    case 'sm':
      spinnerSizeClasses = 'w-5 h-5';
      textSizeClasses = 'text-sm';
      break;
    case 'lg':
      spinnerSizeClasses = 'w-12 h-12';
      textSizeClasses = 'text-xl';
      break;
    case 'md':
    default:
      spinnerSizeClasses = 'w-8 h-8';
      textSizeClasses = 'text-lg';
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-blue-200 border-t-blue-500 ${spinnerSizeClasses}`}
      ></div>
      {message && <p className={`mt-3 text-gray-600 ${textSizeClasses}`}>{message}</p>}
    </div>
  );
};

export default Loader;
