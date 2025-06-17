
import { useState, useCallback } from 'react';

// Define the possible views our chat can be in
export type ChatView = 'closed' | 'horizontal' | 'modal' | 'sidebar';

export const useChatViewManager = (initialView: ChatView = 'closed') => {
  const [view, setView] = useState<ChatView>(initialView);

  const openModal = useCallback(() => setView('modal'), []);
  const openSidebar = useCallback(() => setView('sidebar'), []);
  const openHorizontal = useCallback(() => setView('horizontal'), []);
  const closeChat = useCallback(() => setView('closed'), []);
  const setViewMode = useCallback((newView: ChatView) => setView(newView), []);

  return {
    view,
    openModal,
    openSidebar,
    openHorizontal,
    closeChat,
    setViewMode,
  };
};
