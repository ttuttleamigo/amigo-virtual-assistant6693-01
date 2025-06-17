
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:shadow-blue-600/40 z-50 border-0 animate-bounce-in transition-all duration-300 transform hover:scale-110"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};

export default ChatButton;
