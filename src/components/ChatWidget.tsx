import React, { useState } from 'react';
import { useConversationFlow, FlowType } from '@/hooks/useConversationFlow';
import { lookupSerialNumber, determineFlowFromModel, ProductInfo } from '@/services/serialNumberService';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';

type ChatState = 'hidden' | 'horizontal' | 'modal' | 'sidebar';

const ChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>('horizontal');
  const [previousState, setPreviousState] = useState<ChatState>('horizontal'); // Track previous state
  const [inputValue, setInputValue] = useState('');
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [expectingSerialNumber, setExpectingSerialNumber] = useState(false);
  const { 
    currentStep, 
    conversationHistory, 
    isInFlow, 
    activeFlow,
    isTyping,
    allowTextInput,
    startFlow, 
    handleUserChoice, 
    resetFlow,
    addRegularMessage,
    addRegularMessageWithTyping,
    setTextInputAllowed,
    downloadTranscript,
    clearChatHistory
  } = useConversationFlow();

  // Function to check if a string looks like a serial number
  const isSerialNumberFormat = (text: string): boolean => {
    // Remove spaces and convert to uppercase
    const cleanText = text.replace(/\s+/g, '').toUpperCase();
    // Check if it matches common serial number patterns (letters and numbers, typically 6+ characters)
    return /^[A-Z0-9]{6,}$/.test(cleanText) || /^\d{6,}$/.test(cleanText);
  };

  const handleSerialNumberSubmit = async (serialNumber: string) => {
    // Don't change state if we're already in sidebar - stay in sidebar
    if (chatState !== 'sidebar') {
      setChatState('modal');
      setPreviousState('modal'); // Update previous state
    }
    
    // Add user message with serial number
    const userMessage = {
      id: Date.now().toString(),
      text: `My serial number is: ${serialNumber}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    // Show loading message with typing
    addRegularMessageWithTyping(["Looking up your product information..."], 500);

    try {
      const productData = await lookupSerialNumber(serialNumber);
      
      if (productData && productData.model) {
        setProductInfo(productData);
        
        // Determine the appropriate flow based on the model
        const flowType = determineFlowFromModel(productData.model);
        
        // Create detailed success message with product info
        let successText = `Found your ${productData.model}!`;
        if (productData.purchaseDate) {
          successText += ` (Purchased: ${productData.purchaseDate})`;
        }
        
        // Add success message with typing delay
        setTimeout(() => {
          addRegularMessageWithTyping([successText], 1000);
          
          // Start the appropriate flow after another delay
          setTimeout(() => {
            startFlow(flowType);
          }, 2500);
        }, 1500);
        
      } else {
        // Serial number not found or no model data - offer retry option
        setTimeout(() => {
          addRegularMessageWithTyping([
            "I couldn't find that serial number in our system. This could be due to a typo or the serial number might not be in our database yet.\n\nWould you like to try entering your serial number again, or would you prefer to contact our support team at 1-800-692-6446?"
          ], 1000);
          
          // Keep expecting serial number for retry
          setExpectingSerialNumber(true);
          setTextInputAllowed(true);
        }, 1500);
      }
    } catch (error) {
      // Error occurred during lookup - offer retry option
      setTimeout(() => {
        addRegularMessageWithTyping([
          "I'm having trouble looking up that serial number right now. This could be a temporary connection issue.\n\nWould you like to try entering your serial number again, or contact our support team at 1-800-692-6446?"
        ], 1000);
        
        // Keep expecting serial number for retry
        setExpectingSerialNumber(true);
        setTextInputAllowed(true);
      }, 1500);
    }
    
    setExpectingSerialNumber(false);
    setTextInputAllowed(false); // Disable text input after serial number submission
  };

  const handleSuggestedAction = (action: string, flowType?: FlowType) => {
    setChatState('modal');
    setPreviousState('modal'); // Update previous state
    
    // Add user message
    const newMessage = {
      id: Date.now().toString(),
      text: action,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);

    // Handle different actions
    if (action === 'I need help with an Amigo cart repair') {
      // Ask for serial number first
      addRegularMessageWithTyping([
        "I'd be happy to help you with your Amigo cart repair! To provide the most accurate troubleshooting steps, could you please provide your cart's serial number? You can find it on a label typically located on the back or bottom of your cart."
      ], 1500);
      setExpectingSerialNumber(true);
      setTextInputAllowed(true); // Allow text input for serial number
    } else if (action === 'I need to buy a part for an Amigo cart') {
      // Direct to parts ordering
      addRegularMessageWithTyping([
        "I can help you with ordering parts for your Amigo cart! You can order parts through several methods:\n\n• Call our parts department at 1-800-692-6446\n• Email parts@amigomobility.com\n• Visit our website at amigomobility.com/parts\n\nPlease have your cart's model number and serial number ready when ordering. Would you like help finding your serial number?"
      ], 1500);
      setTextInputAllowed(false); // No text input needed for this flow
    } else if (action === 'I have a different customer service need') {
      // Start contact agent flow
      setTimeout(() => {
        startFlow('contactAgent');
      }, 1500);
    }
  };

  const handleFlowChoice = (choice: string, nextStep: string) => {
    handleUserChoice(choice, nextStep);
  };

  const handleModalToSidebar = () => {
    setChatState('sidebar');
    setPreviousState('sidebar'); // Update previous state
  };

  const handleMinimize = () => {
    setChatState('modal'); // Changed from 'minimized' to 'modal'
    setPreviousState('modal'); // Update previous state
  };

  const handleClose = () => {
    // Store current state as previous before closing (but only if it's not horizontal)
    if (chatState !== 'hidden' && chatState !== 'horizontal') {
      setPreviousState(chatState);
    }
    setChatState('hidden');
    resetFlow();
    setProductInfo(null);
    setExpectingSerialNumber(false);
  };

  const handleChatButtonClick = () => {
    // Always restore to previous state if it's not horizontal, otherwise default to horizontal
    if (previousState !== 'horizontal') {
      setChatState(previousState);
    } else {
      setChatState('horizontal');
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Check if we're expecting a serial number and the input looks like one
    if (expectingSerialNumber && isSerialNumberFormat(inputValue)) {
      handleSerialNumberSubmit(inputValue);
      setInputValue('');
      return;
    }
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);
    setInputValue('');

    if (!isInFlow && !expectingSerialNumber) {
      addRegularMessageWithTyping([
        "I can help you troubleshoot your Amigo cart. For the most accurate assistance, could you provide your serial number? You can click 'Enter Serial #' or just tell me what issue you're experiencing."
      ], 1500);
    } else if (expectingSerialNumber && !isSerialNumberFormat(inputValue)) {
      // User entered text that doesn't look like a serial number
      addRegularMessageWithTyping([
        "I didn't recognize that as a serial number. Serial numbers are typically 6 or more characters long and contain letters and numbers. Could you please double-check and enter your serial number again? You can also contact our support team at 1-800-692-6446 if you need help locating it."
      ], 1500);
    }
  };

  // Separate send message for horizontal chat that doesn't add to conversation history
  const sendHorizontalMessage = () => {
    if (!inputValue.trim()) return;
    
    // For horizontal chat, we just handle suggested actions, not free text
    // This prevents messages from horizontal appearing in modal/sidebar
    setInputValue('');
  };

  // Calculate if input should be disabled
  const isInputDisabled = !allowTextInput || (isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0);

  if (chatState === 'hidden') {
    return <ChatButton onClick={handleChatButtonClick} />;
  }

  if (chatState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendHorizontalMessage}
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
        isTyping={isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
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
        isTyping={isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  return null;
};

export default ChatWidget;
