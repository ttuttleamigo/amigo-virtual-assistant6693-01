
import React from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HorizontalChatProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  onClose: () => void;
  onSuggestedAction: (action: string, flowType?: 'general' | 'smartShopper' | 'valueShopper') => void;
}

const HorizontalChat = ({
  inputValue,
  setInputValue,
  sendMessage,
  onClose,
  onSuggestedAction
}: HorizontalChatProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow-xl border border-gray-200 min-w-[700px] max-w-4xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Get help with your Amigo cart troubleshooting and support</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full pr-10 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 h-8 w-8 p-0"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => onSuggestedAction('Start troubleshooting', 'general')}
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
              >
                General Amigo
              </Button>
              <Button
                onClick={() => onSuggestedAction('Start troubleshooting', 'smartShopper')}
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
              >
                SmartShopper
              </Button>
              <Button
                onClick={() => onSuggestedAction('Start troubleshooting', 'valueShopper')}
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
              >
                ValueShopper
              </Button>
              <Button
                onClick={() => onSuggestedAction('Start troubleshooting', 'vista')}
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
              >
                Vista
              </Button>
              <Button
                onClick={() => onSuggestedAction('Connect me with support')}
                variant="outline"
                size="sm"
                className="text-xs px-3 py-1.5 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
              >
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalChat;
