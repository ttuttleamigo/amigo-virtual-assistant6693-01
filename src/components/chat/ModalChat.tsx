
import React from 'react';
import ModalHeader from './ModalHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { useChat } from '@/hooks/useChat';

const ModalChat = () => {
  const {
    conversationHistory,
    inputValue,
    setInputValue,
    sendMessage,
    handleClose,
    handleModalToSidebar,
    isTyping,
    isInputDisabled,
    currentStep,
    handleFlowChoice,
    shouldShowButtons,
    downloadTranscript,
    clearChatHistory
  } = useChat();

  const hasOnlyButtonOptions = currentStep && currentStep.userOptions && currentStep.userOptions.length > 0;

  // Check if we're in serial collection mode
  const isSerialCollectionMode = currentStep?.id === 'serial_collection';

  // Show input field if we're in serial collection mode OR if there are no button-only options
  const shouldShowInput = isSerialCollectionMode || !hasOnlyButtonOptions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-scale-in">
      <div className="bg-transparent rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <ModalHeader
          onClose={handleClose}
          onModalToSidebar={handleModalToSidebar}
          onDownloadTranscript={downloadTranscript}
          onClearHistory={clearChatHistory}
          conversationHistory={conversationHistory}
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
    </div>
  );
};

export default ModalChat;
