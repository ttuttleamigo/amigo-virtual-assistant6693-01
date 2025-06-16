
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HorizontalChatProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  onClose: () => void;
  onSuggestedAction: (action: string, flowType?: 'general' | 'smartShopper' | 'valueShopper' | 'vista') => void;
  onSerialNumberSubmit: (serialNumber: string) => void;
}

const HorizontalChat = ({
  inputValue,
  setInputValue,
  sendMessage,
  onClose,
  onSuggestedAction,
  onSerialNumberSubmit
}: HorizontalChatProps) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isSerialNumberMode, setIsSerialNumberMode] = useState(false);

  const handleSerialSubmit = () => {
    if (serialNumber.trim()) {
      onSerialNumberSubmit(serialNumber.trim());
      setSerialNumber('');
      setIsSerialNumberMode(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 min-w-[600px] max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-1">
            How can <span className="text-blue-500">Amigo</span> help?
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Amigo Assistant joined • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
          
          {/* Input Section */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                value={isSerialNumberMode ? serialNumber : inputValue}
                onChange={(e) => isSerialNumberMode ? setSerialNumber(e.target.value) : setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-full pr-12 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && (isSerialNumberMode ? handleSerialSubmit() : sendMessage())}
              />
              <Button
                onClick={isSerialNumberMode ? handleSerialSubmit : sendMessage}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 h-7 w-7 p-0"
                disabled={isSerialNumberMode ? !serialNumber.trim() : !inputValue.trim()}
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={() => onSuggestedAction('I need help with an Amigo cart repair')}
                variant="outline"
                className="flex-1 text-xs px-3 py-2 h-9 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-normal rounded-md"
              >
                I need help with an Amigo cart repair
              </Button>
              <Button
                onClick={() => onSuggestedAction('I need to buy a part for an Amigo cart')}
                variant="outline"
                className="flex-1 text-xs px-3 py-2 h-9 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-normal rounded-md"
              >
                I need to buy a part for an Amigo cart
              </Button>
              <Button
                onClick={() => onSuggestedAction('I have a different customer service need')}
                variant="outline"
                className="flex-1 text-xs px-3 py-2 h-9 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-normal rounded-md"
              >
                I have a different customer service need
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalChat;
