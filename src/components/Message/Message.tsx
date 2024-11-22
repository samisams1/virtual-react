import React, { useEffect, useState } from 'react';

interface MessageProps {
  message: string | null;
  type: 'success' | 'error' | 'loading'; // No null here
  onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ message, type, onClose }) => {
  const [progress, setProgress] = useState(100); // Progress percentage

  useEffect(() => {
    if (message && type !== 'loading') {
      const totalDuration = 5000; // Total duration in milliseconds (5 seconds)
      const intervalDuration = 100; // Interval duration in milliseconds
      const steps = totalDuration / intervalDuration; // Total steps based on interval

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            onClose();
            clearInterval(timer);
            return 0;
          }
          return prev - (100 / steps); // Decrease progress over total duration
        });
      }, intervalDuration);

      return () => clearInterval(timer);
    }
  }, [message, type, onClose]);

  if (!message) return null; // Don't render if there's no message

  const getMessageStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'loading':
        return 'bg-yellow-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-md transition-all duration-300 ${getMessageStyles()}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white font-bold">
          &times;
        </button>
      </div>
      <div className="h-1 bg-gray-300 mt-2 rounded">
        <div
          style={{ width: `${progress}%` }}
          className={`h-full transition-all duration-1000 ${getMessageStyles()}`}
        />
      </div>
    </div>
  );
};

export default Message;