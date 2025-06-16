
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
          <img 
            src="/lovable-uploads/7a9d14cc-e93b-47a3-b3c8-c9ce3563866f.png" 
            alt="Amigo" 
            className="w-6 h-6 object-contain"
          />
        </div>
        <div className="bg-white border border-gray-100 rounded-lg rounded-bl-none p-4 shadow-sm min-w-[120px]">
          <div className="space-y-2">
            <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded animate-pulse" style={{ animationDuration: '2s' }}></div>
            <div className="h-3 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded animate-pulse w-4/5" style={{ animationDelay: '0.3s', animationDuration: '2s' }}></div>
            <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded animate-pulse w-3/5" style={{ animationDelay: '0.6s', animationDuration: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
