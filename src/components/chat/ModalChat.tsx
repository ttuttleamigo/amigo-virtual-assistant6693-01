
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-scale-in border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-sm">Amigo Assistant</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onModalToSidebar}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            How can <span className="text-blue-600">Amigo</span> help?
          </h2>
          <p className="text-gray-500 text-sm">
            Amigo Assistant joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>

        <div className="px-4 py-4 space-y-4 max-h-80 overflow-y-auto bg-gray-50">
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
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
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
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 shadow-sm max-w-[75%]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Typing...</span>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/5" />
                </div>
              </div>
            </div>
          )}

          {isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && onFlowChoice && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-gray-500 font-medium">Quick actions:</p>
              {currentStep.userOptions.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onFlowChoice(option.text, option.nextStep)}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start text-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 min-h-[2.5rem] h-auto py-3 px-4 whitespace-normal leading-relaxed transition-all duration-200"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}
          
          <Button
            onClick={onModalToSidebar}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
          >
            Continue conversation
          </Button>
        </div>

        {!hasOnlyButtonOptions && (
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 px-4"
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
