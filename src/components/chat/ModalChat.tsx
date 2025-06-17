
import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { ConversationStep } from '@/data/conversationFlow';
import TypingIndicator from './TypingIndicator';
import ModalHeader from './ModalHeader';
import ChatInput from './ChatInput';
import ButtonGroup from '@/components/visual/ButtonGroup';
import { ButtonConfig } from '@/config/buttonConfig';
import { visualConfig } from '@/config/visualConfig';
import { convertToButtonConfig } from '@/lib/mappers';

interface ModalChatProps {
  conversationHistory: ConversationMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  onClose: () => void;
  onModalToSidebar: () => void;
  isInFlow?: boolean;
  currentStep?: ConversationStep | null;
  onFlowChoice?: (choice: string, nextStep: string) => void;
  isTyping?: boolean;
  isInputDisabled?: boolean;
  onDownloadTranscript?: () => void;
  onClearHistory?: () => void;
  showButtons?: boolean;
}

const ModalChat = ({
  conversationHistory,
  inputValue,
  setInputValue,
  sendMessage,
  onClose,
  onModalToSidebar,
  isInFlow = false,
  currentStep = null,
  onFlowChoice,
  isTyping = false,
  isInputDisabled = false,
  onDownloadTranscript,
  onClearHistory,
  showButtons = true
}: ModalChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasOnlyButtonOptions = currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Check if we're in serial collection mode
  const isSerialCollectionMode = currentStep?.id === 'serial_collection';

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

  // Show input field if we're in serial collection mode OR if there are no button-only options
  const shouldShowInput = isSerialCollectionMode || !hasOnlyButtonOptions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-scale-in">
      <div className="bg-transparent rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <ModalHeader
          onClose={onClose}
          onModalToSidebar={onModalToSidebar}
          onDownloadTranscript={onDownloadTranscript}
          onClearHistory={onClearHistory}
          conversationHistory={conversationHistory}
        />

        {/* Messages Container - Fixed height with scroll */}
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

        {/* Input Section */}
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          sendMessage={sendMessage}
          currentStep={currentStep}
          isTyping={isTyping}
          isInputDisabled={isInputDisabled}
          shouldShowInput={shouldShowInput}
        />
      </div>
    </div>
  );
};

export default ModalChat;
