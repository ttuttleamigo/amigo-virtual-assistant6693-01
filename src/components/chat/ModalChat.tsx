
import React from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-gray-800">Amigo Assistant</span>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onModalToSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How can <span className="text-blue-600">Amigo</span> help?
          </h2>
          <p className="text-gray-600 text-sm mb-4">Amigo Assistant joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {conversationHistory.slice(-5).map(message => (
              <div key={message.id} className={`flex items-start space-x-2 ${message.sender === 'user' ? 'justify-end flex-row-reverse space-x-reverse' : 'justify-start'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'agent' ? 'bg-gradient-to-r from-blue-600 to-green-500' : 'bg-gray-600'
                }`}>
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
                <div className={`text-left text-sm whitespace-pre-wrap ${
                  message.sender === 'user' ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0 && onFlowChoice && (
            <div className="space-y-2 mt-4">
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
          
          <Button
            onClick={onModalToSidebar}
            className="mt-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
          >
            Continue conversation
          </Button>
        </div>

        {!hasOnlyButtonOptions && (
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
        )}
      </div>
    </div>
  );
};

export default ModalChat;
