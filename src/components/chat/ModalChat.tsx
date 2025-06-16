
import React from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { ConversationStep } from '@/data/conversationFlow';
import TypingIndicator from './TypingIndicator';

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
  isInputDisabled = false
}: ModalChatProps) => {
  const hasOnlyButtonOptions = isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/b12f4efb-0fa0-4019-ba3b-e5cffcf2ef22.png" 
              alt="Amigo Virtual Assistant" 
              className="h-8 object-contain"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onModalToSidebar}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Title Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            How can <span className="text-blue-600">Amigo</span> help?
          </h2>
          <p className="text-gray-600 text-sm">
            Amigo Support joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
          {conversationHistory.filter(msg => msg.text !== 'typing').slice(-10).map(message => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'agent' ? 'bg-white border border-gray-200' : 'bg-gray-500'
                }`}>
                  {message.sender === 'agent' ? (
                    <img 
                      src="/lovable-uploads/7a9d14cc-e93b-47a3-b3c8-c9ce3563866f.png" 
                      alt="Amigo" 
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-gray-100 text-gray-900 rounded-tl-sm border'
                }`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}

          {isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && onFlowChoice && (
            <div className="space-y-2 mt-4">
              {currentStep.userOptions.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onFlowChoice(option.text, option.nextStep)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3 border-blue-200 hover:bg-blue-50 hover:border-blue-300 whitespace-normal break-words"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Input Section */}
        {!hasOnlyButtonOptions && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isInputDisabled ? "Please select an option above" : "Type your message here..."}
                  className="w-full pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && !isInputDisabled && sendMessage()}
                  disabled={isInputDisabled}
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 p-0"
                  disabled={!inputValue.trim() || isInputDisabled}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalChat;
