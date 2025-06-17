
import React from 'react';
import { useChat } from '@/hooks/useChat';
import SidebarHeader from './SidebarHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const SidebarChat = () => {
  const {
    conversationHistory,
    inputValue,
    setInputValue,
    sendMessage,
    handleClose,
    handleMinimize,
    currentStep,
    handleFlowChoice,
    isTyping,
    isInputDisabled,
    downloadTranscript,
    clearChatHistory,
    shouldShowButtons
  } = useChat();

  // Check if we're in serial collection mode
  const isSerialCollectionMode = currentStep?.id === 'serial_collection';

  // Show input field if we're in serial collection mode OR if there are no button-only options
  const hasOnlyButtonOptions = currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;
  const shouldShowInput = isSerialCollectionMode || !hasOnlyButtonOptions;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 shadow-2xl z-50 animate-slide-in-right border-l border-gray-200 flex flex-col">
      {/* Header */}
      <SidebarHeader
        onClose={handleClose}
        onExpand={handleMinimize}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
        hasHistory={conversationHistory.length > 0}
      />

      {/* Messages Container */}
      <MessageList
        conversationHistory={conversationHistory}
        currentStep={currentStep}
        onFlowChoice={handleFlowChoice}
        isTyping={isTyping}
        showButtons={shouldShowButtons}
      />

      {/* Input Section */}
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
