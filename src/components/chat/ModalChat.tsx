
import React from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { ConversationStep } from '@/data/conversationFlow';

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
  onFlowChoice
}: ModalChatProps) => {
  const hasOnlyButtonOptions = isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;
  const isLoading = conversationHistory.some(msg => msg.text.includes("Looking up") || msg.text.includes("loading"));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-700 text-sm">Agentforce</span>
          </div>
          <div className="flex space-x-1">
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
        
        {/* Title */}
        <div className="px-6 py-4 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-2">
            How can <span className="text-blue-600 font-medium">Agentforce</span> help?
          </h2>
          <p className="text-gray-500 text-sm">
            Agentforce joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} PM
          </p>
        </div>

        {/* Messages */}
        <div className="px-6 py-4 space-y-4 max-h-80 overflow-y-auto bg-gray-50">
          {conversationHistory.slice(-5).map(message => (
            <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end flex-row-reverse space-x-reverse' : 'justify-start'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'agent' ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className={`max-w-[75%] p-3 rounded-lg text-sm ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
              }`}>
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-lg rounded-bl-none p-3 shadow-sm max-w-[75%]">
                <div className="space-y-2">
                  <div className="h-3 bg-blue-200 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-blue-200 rounded-full animate-pulse w-4/5"></div>
                  <div className="h-3 bg-blue-200 rounded-full animate-pulse w-3/5"></div>
                </div>
              </div>
            </div>
          )}

          {isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && onFlowChoice && (
            <div className="space-y-2 pt-2">
              {currentStep.userOptions.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onFlowChoice(option.text, option.nextStep)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-md px-4 py-2 text-sm font-medium"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}
          
          <Button
            onClick={onModalToSidebar}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 border-0"
          >
            Continue conversation
          </Button>
        </div>

        {!hasOnlyButtonOptions && (
          <div className="p-6 border-t border-gray-100">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about products, features, and pricing, or connect to a sales rep."
                className="w-full bg-gray-50 border-gray-200 rounded-lg pl-12 pr-12 py-3 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <Button
                onClick={sendMessage}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white border-0 h-8 w-8 p-0"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalChat;
