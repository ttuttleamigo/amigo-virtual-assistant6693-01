
import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { ConversationStep } from '@/data/conversationFlow';
import TypingIndicator from './TypingIndicator';
import ButtonGroup from '@/components/visual/ButtonGroup';
import { ButtonConfig } from '@/config/buttonConfig';
import { visualConfig } from '@/config/visualConfig';
import { convertToButtonConfig } from '@/lib/mappers';

interface MessageListProps {
  conversationHistory: ConversationMessage[];
  currentStep?: ConversationStep | null;
  onFlowChoice?: (choice: string, nextStep: string) => void;
  isTyping?: boolean;
  showButtons?: boolean;
}

const MessageList = ({
  conversationHistory,
  currentStep = null,
  onFlowChoice,
  isTyping = false,
  showButtons = true
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [buttonsVisible, setButtonsVisible] = React.useState(false);

  // Handle button visibility with proper timing
  useEffect(() => {
    if (currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && showButtons) {
      setButtonsVisible(false);
      const timer = setTimeout(() => {
        setButtonsVisible(true);
      }, visualConfig.timing.buttonDelay);
      return () => clearTimeout(timer);
    } else {
      setButtonsVisible(false);
    }
  }, [currentStep, showButtons]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, isTyping, currentStep]);

  const handleButtonClick = (button: ButtonConfig) => {
    if (onFlowChoice) {
      onFlowChoice(button.action, "");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 min-h-[500px] bg-gradient-to-b from-blue-50 via-blue-25 to-white">
      {/* Title and timestamp - now in scrollable area */}
      <div className="text-center pb-4 border-b border-blue-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          How can <span className="text-blue-500">Amigo</span> help?
        </h2>
        <p className="text-black text-sm font-medium">
          Amigo Support joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>

      {conversationHistory.filter(msg => msg.text !== 'typing').slice(-10).map(message => (
        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start space-x-4 max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'agent' ? 'bg-white border-2 border-blue-100 shadow-sm' : 'bg-blue-600'
            }`}>
              {message.sender === 'agent' ? (
                <img 
                  src="/lovable-uploads/7a9d14cc-e93b-47a3-b3c8-c9ce3563866f.png" 
                  alt="Amigo" 
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <MessageCircle className="w-5 h-5 text-white" />
              )}
            </div>
            <div className={`px-6 py-4 rounded-2xl text-sm whitespace-pre-wrap shadow-sm leading-relaxed ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-md' 
                : 'bg-white text-gray-800 rounded-tl-md border border-blue-100'
            }`}>
              {message.text}
            </div>
          </div>
        </div>
      ))}

      {isTyping && <TypingIndicator />}

      {currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && onFlowChoice && showButtons && (
        <div className={`transition-all duration-${visualConfig.animations.fadeInDuration} ${
          buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <ButtonGroup
            buttons={convertToButtonConfig(currentStep.userOptions)}
            onButtonClick={handleButtonClick}
            disabled={!buttonsVisible}
            variant="chat"
          />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
