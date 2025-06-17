
import React from 'react';
import { useChatContext } from '@/context/ChatContext';
import SidebarHeader from './SidebarHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const SidebarChat = () => {
  const {
    conversationHistory,
    inputValue,
    setInputValue,
    sendMessage,
    closeChat,
    openSidebar,
    isTyping,
    isInputDisabled,
    currentStep,
    handleFlowChoice,
    shouldShowButtons,
    downloadTranscript,
    clearChatHistory
  } = useChatContext();

  // Check if we're in serial collection mode
  const isSerialCollectionMode = currentStep?.id === 'serial_collection';

  // Show input field if we're in serial collection mode OR if there are no button-only options
  const hasOnlyButtonOptions = currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;
  const shouldShowInput = isSerialCollectionMode || !hasOnlyButtonOptions;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 shadow-2xl z-50 animate-slide-in-right border-l border-gray-200 flex flex-col">
      <SidebarHeader
        onClose={closeChat}
        onExpand={openSidebar}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
        conversationHistory={conversationHistory}
      />

      <MessageList
        conversationHistory={conversationHistory}
        currentStep={currentStep}
        onFlowChoice={handleFlowChoice}
        isTyping={isTyping}
        showButtons={shouldShowButtons}
      />

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        currentStep={currentStep}
        isTyping={isTyping}
        isInputDisabled={isInputDisabled}
        shouldShowInput={shouldShowInput}
      />
    </div>
  );
};

export default SidebarChat;
