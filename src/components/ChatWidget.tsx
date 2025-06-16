import React, { useState } from 'react';
import { useConversationFlow, FlowType } from '@/hooks/useConversationFlow';
import { lookupSerialNumber, determineFlowFromModel, ProductInfo } from '@/services/serialNumberService';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';
import MinimizedChat from './chat/MinimizedChat';

type ChatState = 'hidden' | 'horizontal' | 'modal' | 'sidebar' | 'minimized';

const ChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>('horizontal');
  const [inputValue, setInputValue] = useState('');
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
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

  const handleSerialNumberSubmit = async (serialNumber: string) => {
    setChatState('modal');
    
    // Add user message with serial number
    const userMessage = {
      id: Date.now().toString(),
      text: `My serial number is: ${serialNumber}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    // Show loading message
    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      text: "Looking up your product information...",
      sender: 'agent' as const,
      timestamp: new Date()
    };
    addRegularMessage(loadingMessage);

    try {
      const productData = await lookupSerialNumber(serialNumber);
      
      if (productData) {
        setProductInfo(productData);
        
        // Determine the appropriate flow based on the model
        const flowType = determineFlowFromModel(productData.model);
        
        // Add success message with product info
        const successMessage = {
          id: (Date.now() + 2).toString(),
          text: `Found your ${productData.model}! Let me start the appropriate troubleshooting guide for you.`,
          sender: 'agent' as const,
          timestamp: new Date()
        };
        addRegularMessage(successMessage);
        
        // Start the appropriate flow
        setTimeout(() => {
          startFlow(flowType);
        }, 1000);
        
      } else {
        // Serial number not found
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          text: "I couldn't find that serial number in our system. Please double-check the serial number or contact our support team at 1-800-692-6446 for assistance.",
          sender: 'agent' as const,
          timestamp: new Date()
        };
        addRegularMessage(errorMessage);
      }
    } catch (error) {
      // Error occurred during lookup
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        text: "I'm having trouble looking up that serial number right now. Please try again later or contact our support team at 1-800-692-6446.",
        sender: 'agent' as const,
        timestamp: new Date()
      };
      addRegularMessage(errorMessage);
    }
  };

  const handleSuggestedAction = (action: string, flowType?: FlowType) => {
    setChatState('modal');
    if (action === 'Start troubleshooting' && flowType) {
      startFlow(flowType);
    } else if (action === 'Connect me with support') {
      startFlow('contactAgent');
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
    setProductInfo(null);
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
          text: "I can help you troubleshoot your Amigo cart. For the most accurate assistance, could you provide your serial number? You can click 'Enter Serial #' or just tell me what issue you're experiencing.",
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
        onSerialNumberSubmit={handleSerialNumberSubmit}
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
        isInFlow={isInFlow}
        currentStep={currentStep}
        onFlowChoice={handleFlowChoice}
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
