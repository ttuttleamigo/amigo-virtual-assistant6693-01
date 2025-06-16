
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
        <div className="bg-white border border-gray-100 rounded-lg rounded-bl-none p-3 shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full animate-bounce" style={{ animationDuration: '1.4s' }}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
