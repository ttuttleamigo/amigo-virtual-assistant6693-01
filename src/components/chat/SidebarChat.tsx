
import React from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { ConversationStep } from '@/data/conversationFlow';

interface SidebarChatProps {
  conversationHistory: ConversationMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  onClose: () => void;
  onMinimize: () => void;
  isInFlow: boolean;
  currentStep: ConversationStep | null;
  onFlowChoice: (choice: string, nextStep: string) => void;
}

const SidebarChat = ({
  conversationHistory,
  inputValue,
  setInputValue,
  sendMessage,
  onClose,
  onMinimize,
  isInFlow,
  currentStep,
  onFlowChoice
}: SidebarChatProps) => {
  const hasOnlyButtonOptions = isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;
  const isLoading = conversationHistory.some(msg => msg.text.includes("Looking up") || msg.text.includes("loading"));

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 animate-slide-in-right border-l border-gray-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-medium text-gray-900 text-sm">Amigo Assistant</span>
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
            onClick={onMinimize}
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
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          How can <span className="text-blue-500">Amigo</span> help?
        </h2>
        <p className="text-gray-600 text-sm">
          Amigo Assistant joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
        {conversationHistory.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'agent' ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className={`text-sm p-3 rounded-lg whitespace-pre-wrap ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              }`}>
                {message.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Typing...</span>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          </div>
        )}

        {isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Quick actions:</p>
            {currentStep.userOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => onFlowChoice(option.text, option.nextStep)}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start text-sm border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 min-h-[2.5rem] h-auto py-3 px-4 whitespace-normal leading-relaxed transition-all duration-200"
              >
                {option.text}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Input - Fixed at bottom */}
      {!hasOnlyButtonOptions && (
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex space-x-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarChat;
