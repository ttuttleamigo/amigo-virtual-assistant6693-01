
import React from 'react';
import MessageFormatter from './MessageFormatter';
import ButtonGroup from './ButtonGroup';
import { ButtonConfig } from '@/config/buttonConfig';

interface ConversationLayoutProps {
  message?: string | string[];
  buttons?: ButtonConfig[];
  onButtonClick?: (button: ButtonConfig) => void;
  isTyping?: boolean;
  showButtons?: boolean;
  isModal?: boolean;
  className?: string;
}

const ConversationLayout = ({
  message,
  buttons = [],
  onButtonClick,
  isTyping = false,
  showButtons = true,
  isModal = false,
  className = ''
}: ConversationLayoutProps) => {
  if (!message && buttons.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {message && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-4 max-w-[75%]">
            <div className={`${isModal ? 'w-10 h-10' : 'w-8 h-8'} rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-blue-100 shadow-sm`}>
              <img 
                src="/lovable-uploads/7a9d14cc-e93b-47a3-b3c8-c9ce3563866f.png" 
                alt="Amigo" 
                className={`${isModal ? 'w-6 h-6' : 'w-4 h-4'} object-contain`}
              />
            </div>
            <div className={`${isModal ? 'px-6 py-4 text-sm' : 'p-3 text-sm'} rounded-2xl bg-white text-gray-800 rounded-tl-md border border-blue-100 shadow-sm leading-relaxed`}>
              <MessageFormatter content={message} />
            </div>
          </div>
        </div>
      )}

      {buttons.length > 0 && showButtons && onButtonClick && (
        <ButtonGroup 
          buttons={buttons}
          onButtonClick={onButtonClick}
          disabled={isTyping}
        />
      )}
    </div>
  );
};

export default ConversationLayout;
