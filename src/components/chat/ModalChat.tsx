
import React from 'react';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { ConversationStep } from '@/data/conversationFlow';
import ModalHeader from './ModalHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

interface ModalChatProps {
  conversationHistory: ConversationMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  onClose: () => void;
  onModalToSidebar: () => void;
  isInFlow?: boolean;
  currentStep?: ConversationStep | null;
  onFlowChoice?: (choice: string, nextStep: string) => void;
  isTyping?: boolean;
  isInputDisabled?: boolean;
  onDownloadTranscript?: () => void;
  onClearHistory?: () => void;
  showButtons?: boolean;
}

const ModalChat = ({
  conversationHistory,
  inputValue,
  setInputValue,
  sendMessage,
  onClose,
  onModalToSidebar,
  isInFlow = false,
  currentStep = null,
  onFlowChoice,
  isTyping = false,
  isInputDisabled = false,
  onDownloadTranscript,
  onClearHistory,
  showButtons = true
}: ModalChatProps) => {
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
          onClose={onClose}
          onModalToSidebar={onModalToSidebar}
          onDownloadTranscript={onDownloadTranscript}
          onClearHistory={onClearHistory}
          conversationHistory={conversationHistory}
        />

        {/* Messages Container */}
        <MessageList
          conversationHistory={conversationHistory}
          currentStep={currentStep}
          onFlowChoice={onFlowChoice}
          isTyping={isTyping}
          showButtons={showButtons}
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
