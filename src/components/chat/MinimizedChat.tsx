
import React from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConversationMessage } from '@/hooks/useConversationFlow';

interface MinimizedChatProps {
  conversationHistory: ConversationMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  onClose: () => void;
  onRestore: () => void;
}

const MinimizedChat = ({
  conversationHistory,
  inputValue,
  setInputValue,
  sendMessage,
  onClose,
  onRestore
}: MinimizedChatProps) => {
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl z-50 animate-scale-in">
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-3 h-3" />
          </div>
          <span className="font-semibold text-sm">Amigo Assistant</span>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestore}
            className="text-white hover:bg-white/20 p-1"
          >
            <Minimize2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="p-3 max-h-60 overflow-y-auto">
        {conversationHistory.slice(-3).map(message => (
          <div key={message.id} className={`flex mb-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`text-xs p-2 rounded max-w-[85%] ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {message.text.length > 100 ? message.text.substring(0, 100) + '...' : message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message Amigo Assistant"
            className="flex-1 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 p-2"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MinimizedChat;
