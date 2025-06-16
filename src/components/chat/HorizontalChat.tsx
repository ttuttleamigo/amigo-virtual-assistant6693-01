
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
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-blue-600 rounded-lg shadow-xl min-w-[600px] max-w-4xl">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:text-white hover:bg-white/20 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {/* Input Section */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about products, features, and pricing, or connect to a sales rep."
                className="w-full bg-white border-0 rounded-lg pl-12 pr-4 py-3 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent"
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-blue-500 text-blue-600 hover:text-white border-0 h-8 w-8 p-0"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => onSuggestedAction('Show me an Agentforce demo')}
                className="bg-blue-700 hover:bg-blue-800 text-white border-0 rounded-md px-4 py-2 text-sm font-medium"
              >
                Show me an Agentforce demo
              </Button>
              <Button
                onClick={() => onSuggestedAction('How can Salesforce help my business')}
                className="bg-blue-700 hover:bg-blue-800 text-white border-0 rounded-md px-4 py-2 text-sm font-medium"
              >
                How can Salesforce help my business
              </Button>
              <Button
                onClick={() => onSuggestedAction('Connect me with a sales rep')}
                className="bg-blue-700 hover:bg-blue-800 text-white border-0 rounded-md px-4 py-2 text-sm font-medium"
              >
                Connect me with a sales rep
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalChat;
