
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Expand, Download, Trash2 } from 'lucide-react';
import { ConversationMessage } from '@/hooks/useConversationFlow';

interface SidebarHeaderProps {
  onClose: () => void;
  onExpand: () => void;
  onDownloadTranscript?: () => void;
  onClearHistory?: () => void;
  conversationHistory: ConversationMessage[];
}

const SidebarHeader = ({
  onClose,
  onExpand,
  onDownloadTranscript,
  onClearHistory,
  conversationHistory
}: SidebarHeaderProps) => {
  const handleClearHistory = () => {
    if (onClearHistory && conversationHistory.length > 0) {
      if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
        onClearHistory();
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-blue-100 flex-shrink-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600">
      <div className="flex items-center space-x-3">
        <img 
          src="/lovable-uploads/4b9131f2-ab48-4c5a-951f-e24f1806cf8e.png" 
          alt="Amigo Virtual Assistant" 
          className="h-8 object-contain" 
        />
      </div>
      <div className="flex space-x-1">
        {onClearHistory && conversationHistory.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearHistory} 
            className="text-white hover:text-white hover:bg-white/20 h-8 w-8 p-0"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
        {onDownloadTranscript && conversationHistory.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDownloadTranscript} 
            className="text-white hover:text-white hover:bg-white/20 h-8 w-8 p-0"
            title="Download Transcript"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onExpand} 
          className="text-white hover:text-white hover:bg-white/20 h-8 w-8 p-0"
          title="Expand to Modal"
        >
          <Expand className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose} 
          className="text-white hover:text-white hover:bg-white/20 h-8 w-8 p-0"
          title="Close Chat"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
