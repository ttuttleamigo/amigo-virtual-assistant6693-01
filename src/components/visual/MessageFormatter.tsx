
import React from 'react';
import { messageFormatter } from '@/config/messageFormatting';

interface MessageFormatterProps {
  content: string | string[];
  type?: 'simple' | 'bulleted' | 'numbered' | 'structured';
  className?: string;
}

const MessageFormatter = ({ 
  content, 
  type = 'simple', 
  className = '' 
}: MessageFormatterProps) => {
  const formatContent = () => {
    switch (type) {
      case 'simple':
        return messageFormatter.formatMessage(content);
      default:
        return messageFormatter.formatMessage(content);
    }
  };

  return (
    <div className={`whitespace-pre-wrap ${className}`}>
      {formatContent()}
    </div>
  );
};

export default MessageFormatter;
