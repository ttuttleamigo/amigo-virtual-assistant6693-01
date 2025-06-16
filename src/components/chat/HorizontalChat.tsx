
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
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 min-w-[700px] max-w-4xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Input box */}
            <div className="relative">
              {isSerialNumberMode ? (
                <Input
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Enter your serial number (e.g., AMI12345678)"
                  className="w-full pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                  onKeyPress={(e) => e.key === 'Enter' && handleSerialSubmit()}
                />
              ) : (
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about products, features, and pricing, or connect to a sales rep"
                  className="w-full pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
              )}
              <Button
                onClick={isSerialNumberMode ? handleSerialSubmit : sendMessage}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 h-7 w-7 p-0"
                disabled={isSerialNumberMode ? !serialNumber.trim() : !inputValue.trim()}
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Suggested action buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => onSuggestedAction('I need help with an Amigo cart repair')}
                variant="outline"
                className="flex-1 text-sm px-4 py-3 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-200"
              >
                I need help with an Amigo cart repair
              </Button>
              <Button
                onClick={() => onSuggestedAction('I need to buy a part for an Amigo cart')}
                variant="outline"
                className="flex-1 text-sm px-4 py-3 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-200"
              >
                I need to buy a part for an Amigo cart
              </Button>
              <Button
                onClick={() => onSuggestedAction('I have a different customer service need')}
                variant="outline"
                className="flex-1 text-sm px-4 py-3 h-auto border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-200"
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
