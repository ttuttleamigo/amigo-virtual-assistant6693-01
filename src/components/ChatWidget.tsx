
import React, { useState } from 'react';
import { useConversationFlow, FlowType } from '@/hooks/useConversationFlow';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';
import MinimizedChat from './chat/MinimizedChat';

type ChatState = 'hidden' | 'horizontal' | 'modal' | 'sidebar' | 'minimized';

const ChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>('horizontal');
  const [inputValue, setInputValue] = useState('');
  const { 
    currentStep, 
    conversationHistory, 
    isInFlow, 
    activeFlow,
    startFlow, 
    handleUserChoice, 
    resetFlow,
    addRegularMessage 
  } = useConversationFlow();

  const handleSuggestedAction = (action: string, flowType?: FlowType) => {
    setChatState('modal');
    if (action === 'Start troubleshooting' && flowType) {
      startFlow(flowType);
    } else {
      const newMessage = {
        id: Date.now().toString(),
        text: action,
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(newMessage);
    }
  };

  const handleFlowChoice = (choice: string, nextStep: string) => {
    handleUserChoice(choice, nextStep);
  };

  const handleModalToSidebar = () => {
    setChatState('sidebar');
  };

  const handleMinimize = () => {
    setChatState('minimized');
  };

  const handleRestore = () => {
    setChatState('sidebar');
  };

  const handleClose = () => {
    setChatState('hidden');
    resetFlow();
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);
    setInputValue('');

    if (!isInFlow) {
      setTimeout(() => {
        const botResponse = {
          id: (Date.now() + 1).toString(),
          text: "I can help you troubleshoot your Amigo cart. Would you like to start our guided troubleshooting process?",
          sender: 'agent' as const,
          timestamp: new Date()
        };
        addRegularMessage(botResponse);
      }, 1000);
    }
  };

  if (chatState === 'hidden') {
    return <ChatButton onClick={() => setChatState('horizontal')} />;
  }

  if (chatState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onSuggestedAction={handleSuggestedAction}
      />
    );
  }

  if (chatState === 'modal') {
    return (
      <ModalChat
        conversationHistory={conversationHistory}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onModalToSidebar={handleModalToSidebar}
      />
    );
  }

  if (chatState === 'sidebar') {
    return (
      <SidebarChat
        conversationHistory={conversationHistory}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onMinimize={handleMinimize}
        isInFlow={isInFlow}
        currentStep={currentStep}
        onFlowChoice={handleFlowChoice}
      />
    );
  }

  if (chatState === 'minimized') {
    return (
      <MinimizedChat
        conversationHistory={conversationHistory}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onRestore={handleRestore}
      />
    );
  }

  return null;
};

export default ChatWidget;
