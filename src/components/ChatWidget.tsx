
import React from 'react';
import { useChat } from '@/hooks/useChat';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';

const ChatWidget = () => {
  const {
    uiState,
    inputValue,
    setInputValue,
    sendMessage,
    handleClose,
    handleChatButtonClick,
    conversationHistory,
    currentStep,
    handleFlowChoice,
    isTyping,
    isInputDisabled,
    shouldShowButtons,
    handleModalToSidebar,
    handleMinimize,
    downloadTranscript,
    clearChatHistory
  } = useChat();

  const sendHorizontalMessage = () => {
    if (!inputValue.trim()) return;
    setInputValue('');
  };

  // If the state is hidden, show just the button
  if (uiState === 'hidden') {
    return <ChatButton onClick={handleChatButtonClick} />;
  }

  // If the state is horizontal, show the horizontal chat
  if (uiState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onSuggestedAction={(action) => {
          // Handle suggested actions - simplified since logic is in useChat
          sendMessage();
        }}
        onSerialNumberSubmit={(serialNumber) => {
          // Handle serial number submission - simplified since logic is in useChat
          sendMessage();
        }}
      />
    );
  }

  // If the state is modal, show the modal chat
  if (uiState === 'modal') {
    return <ModalChat />;
  }

  // If the state is sidebar, show the sidebar chat
  if (uiState === 'sidebar') {
    return <SidebarChat />;
  }

  return null;
};

export default ChatWidget;
