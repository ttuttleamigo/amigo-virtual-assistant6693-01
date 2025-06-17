
import React, { createContext, useContext } from 'react';
import { useChat } from '@/hooks/useChat';

// Define a type for our hook's return value for type safety
type ChatContextType = ReturnType<typeof useChat>;

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create the Provider component. This component is special because it's the
// only place where our main `useChat` hook will be called.
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chatStateAndActions = useChat();
  
  return (
    <ChatContext.Provider value={chatStateAndActions}>
      {children}
    </ChatContext.Provider>
  );
};

// Create a simple custom hook to let other components access the shared data easily.
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
