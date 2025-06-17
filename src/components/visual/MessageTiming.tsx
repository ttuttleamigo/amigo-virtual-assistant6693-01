
import { useCallback } from 'react';
import { visualConfig } from '@/config/visualConfig';

export interface TimedMessage {
  id: string;
  content: string | string[];
  delay?: number;
}

export const useMessageTiming = () => {
  const addTimedMessage = useCallback((
    messages: TimedMessage[],
    onAddMessage: (content: string) => void,
    onStartTyping?: () => void,
    onStopTyping?: () => void
  ) => {
    if (onStartTyping) onStartTyping();
    
    setTimeout(() => {
      if (onStopTyping) onStopTyping();
      
      messages.forEach((message, index) => {
        const delay = message.delay || visualConfig.timing.messageDelay * index;
        setTimeout(() => {
          const content = Array.isArray(message.content) 
            ? message.content.join('\n\n') 
            : message.content;
          onAddMessage(content);
        }, delay);
      });
    }, visualConfig.timing.typingDelay);
  }, []);

  const addSingleMessage = useCallback((
    content: string | string[],
    onAddMessage: (content: string) => void,
    delay?: number,
    onStartTyping?: () => void,
    onStopTyping?: () => void
  ) => {
    const messageContent = Array.isArray(content) ? content.join('\n\n') : content;
    const messageDelay = delay || visualConfig.timing.typingDelay;
    
    if (onStartTyping) onStartTyping();
    
    setTimeout(() => {
      if (onStopTyping) onStopTyping();
      onAddMessage(messageContent);
    }, messageDelay);
  }, []);

  return {
    addTimedMessage,
    addSingleMessage,
    config: visualConfig.timing
  };
};
