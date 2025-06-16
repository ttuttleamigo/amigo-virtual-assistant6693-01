
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
        <div className="flex flex-col space-y-2 pt-2">
          <div 
            className="h-3 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-full animate-pulse w-16" 
            style={{ animationDuration: '1.5s' }}
          ></div>
          <div 
            className="h-3 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-full animate-pulse w-12" 
            style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}
          ></div>
          <div 
            className="h-3 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-full animate-pulse w-20" 
            style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
