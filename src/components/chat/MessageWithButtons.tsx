
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import AnimatedButtons from './AnimatedButtons';

interface ButtonOption {
  text: string;
  nextStep: string;
}

interface MessageWithButtonsProps {
  message: string;
  options?: ButtonOption[];
  onButtonClick?: (option: ButtonOption, index: number) => void;
  messageDelay?: number;
  buttonDelay?: number;
  isModal?: boolean;
}

const MessageWithButtons = ({ 
  message, 
  options = [], 
  onButtonClick,
  messageDelay = 0,
  buttonDelay = 800,
  isModal = false 
}: MessageWithButtonsProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, messageDelay);

    return () => clearTimeout(timer);
  }, [messageDelay]);

  if (!showMessage) return null;

  return (
    <div className="space-y-4">
      {/* Bot Message */}
      <div className="flex justify-start">
        <div className="flex items-start space-x-4 max-w-[75%]">
          <div className={`${isModal ? 'w-10 h-10' : 'w-8 h-8'} rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-blue-100 shadow-sm`}>
            <img 
              src="/lovable-uploads/7a9d14cc-e93b-47a3-b3c8-c9ce3563866f.png" 
              alt="Amigo" 
              className={`${isModal ? 'w-6 h-6' : 'w-4 h-4'} object-contain`}
            />
          </div>
          <div className={`${isModal ? 'px-6 py-4 text-sm' : 'p-3 text-sm'} rounded-2xl bg-white text-gray-800 rounded-tl-md border border-blue-100 shadow-sm leading-relaxed whitespace-pre-wrap`}>
            {message}
          </div>
        </div>
      </div>

      {/* Animated Buttons */}
      {options.length > 0 && onButtonClick && (
        <AnimatedButtons
          options={options}
          onButtonClick={onButtonClick}
          showDelay={buttonDelay}
        />
      )}
    </div>
  );
};

export default MessageWithButtons;
