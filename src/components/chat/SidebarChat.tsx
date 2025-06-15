
import React from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 animate-slide-in-right">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-3 h-3" />
          </div>
          <span className="font-semibold">Amigo Assistant</span>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-white hover:bg-white/20"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="text-center p-4 bg-blue-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          How can <span className="text-blue-600">Amigo</span> help?
        </h2>
        <p className="text-gray-600 text-xs">Amigo Assistant joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 200px)' }}>
        {conversationHistory.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'agent' ? 'bg-gradient-to-r from-blue-600 to-green-500' : 'bg-gray-600'
              }`}>
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
              <div className={`text-sm p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.text}
              </div>
            </div>
          </div>
        ))}
        
        {isInFlow && currentStep && currentStep.userOptions.length > 0 && (
          <div className="space-y-2">
            {currentStep.userOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => onFlowChoice(option.text, option.nextStep)}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start text-xs border-blue-200 text-blue-700 hover:bg-blue-50 min-h-[2.5rem] h-auto py-2 px-3 whitespace-normal leading-tight"
              >
                {option.text}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message Amigo Assistant"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;
