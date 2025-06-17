
import React from 'react';
import { useChatContext } from '@/context/ChatContext';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';

const ChatWidget = () => {
  const {
    view,
    inputValue,
    setInputValue,
    sendMessage,
    sendSuggestedAction,
    sendSerialNumber,
    handleClose,
    handleChatButtonClick
  } = useChatContext();

  // If the view is closed, show just the button
  if (view === 'closed') {
    return <ChatButton onClick={handleChatButtonClick} />;
  }

  // If the view is horizontal, show the horizontal chat
  if (view === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onSuggestedAction={sendSuggestedAction}
        onSerialNumberSubmit={sendSerialNumber}
      />
    );
  }

  // If the view is modal, show the modal chat
  if (view === 'modal') {
    return <ModalChat />;
  }

  // If the view is sidebar, show the sidebar chat
  if (view === 'sidebar') {
    return <SidebarChat />;
  }

  return null;
};

export default ChatWidget;
