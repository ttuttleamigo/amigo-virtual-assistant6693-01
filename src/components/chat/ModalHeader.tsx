
import React from 'react';
import { X, Minimize2, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConversationMessage } from '@/hooks/useConversationFlow';

interface ModalHeaderProps {
  onClose: () => void;
  onModalToSidebar: () => void;
  onDownloadTranscript?: () => void;
  onClearHistory?: () => void;
  conversationHistory: ConversationMessage[];
}

const ModalHeader = ({
  onClose,
  onModalToSidebar,
  onDownloadTranscript,
  onClearHistory,
  conversationHistory
}: ModalHeaderProps) => {
  const handleClearHistory = () => {
    if (onClearHistory && conversationHistory.length > 0) {
      if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
        onClearHistory();
      }
    }
  };

  return (
    <div className="px-6 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 flex-shrink-0 rounded-t-2xl">
      <div className="flex items-center justify-between">
        <img 
          src="/lovable-uploads/b12f4efb-0fa0-4019-ba3b-e5cffcf2ef22.png" 
          alt="Amigo Virtual Assistant" 
          className="h-10 object-contain"
        />
        <div className="flex items-center space-x-2">
          {onClearHistory && conversationHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="text-white hover:text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
              title="Clear Chat History"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
          {onDownloadTranscript && conversationHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownloadTranscript}
              className="text-white hover:text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
              title="Download Transcript"
            >
              <Download className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onModalToSidebar}
            className="text-white hover:text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
          >
            <Minimize2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
