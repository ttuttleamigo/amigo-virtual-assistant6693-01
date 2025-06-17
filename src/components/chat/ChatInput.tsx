
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConversationStep } from '@/data/conversationFlow';
import { visualConfig } from '@/config/visualConfig';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  currentStep?: ConversationStep | null;
  isTyping?: boolean;
  isInputDisabled?: boolean;
  shouldShowInput: boolean;
}

const ChatInput = ({
  inputValue,
  setInputValue,
  sendMessage,
  currentStep,
  isTyping = false,
  isInputDisabled = false,
  shouldShowInput
}: ChatInputProps) => {
  const [streamingPlaceholder, setStreamingPlaceholder] = React.useState('');

  // Check if we're in serial collection mode
  const isSerialCollectionMode = currentStep?.id === 'serial_collection';

  // Update streaming placeholder when typing
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping) {
      let dots = '';
      interval = setInterval(() => {
        dots = dots === '...' ? '' : dots + '.';
        setStreamingPlaceholder(`Hang on while I check${dots}`);
      }, 500);
    } else {
      setStreamingPlaceholder('');
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTyping]);

  const getPlaceholderText = () => {
    if (isTyping) return streamingPlaceholder;
    if (isSerialCollectionMode) return visualConfig.input.serialPlaceholder;
    if (isInputDisabled) return visualConfig.input.disabledPlaceholder;
    return visualConfig.input.defaultPlaceholder;
  };

  if (!shouldShowInput) return null;

  return (
    <div className="px-8 py-6 border-t border-blue-100 bg-gradient-to-r from-blue-50 via-blue-25 to-white flex-shrink-0 rounded-b-2xl">
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={getPlaceholderText()}
            className="w-full py-4 text-base bg-white border-2 border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-gray-700 placeholder-gray-500 rounded-xl"
            onKeyPress={(e) => e.key === 'Enter' && !isInputDisabled && sendMessage()}
            disabled={isInputDisabled || isTyping}
          />
        </div>
        <Button
          onClick={sendMessage}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 w-12 p-0 border-0 rounded-lg flex-shrink-0"
          disabled={!inputValue.trim() || isInputDisabled || isTyping}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
