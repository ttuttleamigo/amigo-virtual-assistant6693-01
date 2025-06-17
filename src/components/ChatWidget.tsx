import React from 'react';
import { useConversationFlow, FlowType } from '@/hooks/useConversationFlow';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';
import { useChatState, useChatInputState } from './chat/ChatState';
import { useSerialNumberHandler } from './chat/SerialNumberHandler';
import { useModelHandler } from './chat/ModelHandler';
import { useSuggestedActionHandler } from './chat/SuggestedActionHandler';

const ChatWidget = () => {
  const chatStateManager = useChatState();
  const inputState = useChatInputState();
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

  // Initialize handlers
  const { handleSerialNumberSubmit } = useSerialNumberHandler({
    setChatState: chatStateManager.setChatState,
    setPreviousState: chatStateManager.setPreviousState,
    setProductInfo: inputState.setProductInfo,
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setExpectingSerialNumber: inputState.setExpectingSerialNumber,
    setExpectingModel: inputState.setExpectingModel,
    setTextInputAllowed
  });

  const { handleModelSubmit } = useModelHandler({
    setChatState: chatStateManager.setChatState,
    setPreviousState: chatStateManager.setPreviousState,
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setExpectingModel: inputState.setExpectingModel,
    setExpectingSerialNumber: inputState.setExpectingSerialNumber,
    setTextInputAllowed
  });

  const { handleSuggestedAction } = useSuggestedActionHandler({
    setChatState: chatStateManager.setChatState,
    setPreviousState: chatStateManager.setPreviousState,
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setShowInitialButtons: inputState.setShowInitialButtons,
    setTextInputAllowed,
    setExpectingSerialNumber: inputState.setExpectingSerialNumber,
    setAllowSerialNumberEntry: inputState.setAllowSerialNumberEntry,
    setExpectingModel: inputState.setExpectingModel
  });

  // Function to check if a string looks like a serial number
  const isSerialNumberFormat = (text: string): boolean => {
    const cleanText = text.replace(/\s+/g, '').toUpperCase();
    return /^[A-Z0-9]{6,}$/.test(cleanText) || /^\d{6,}$/.test(cleanText);
  };

  // Function to check if a string looks like a model name
  const isModelFormat = (text: string): boolean => {
    const cleanText = text.toLowerCase().trim();
    return cleanText.includes('smartshopper') || 
           cleanText.includes('smart shopper') ||
           cleanText.includes('valueshopper') || 
           cleanText.includes('value shopper') ||
           cleanText.includes('vista') ||
           cleanText.includes('max cr') ||
           cleanText.includes('maxcr') ||
           /^(ss|vs|v|mc)\d*$/.test(cleanText);
  };

  const handleFlowChoice = (choice: string, nextStep: string) => {
    console.log('🔥 ChatWidget - handleFlowChoice called:', choice, nextStep);
    handleUserChoice(choice, nextStep);
  };

  const handleClose = () => {
    chatStateManager.handleClose();
    resetFlow();
    inputState.setProductInfo(null);
    inputState.setExpectingSerialNumber(false);
    inputState.setExpectingModel(false);
    inputState.setAllowSerialNumberEntry(false);
    inputState.setShowInitialButtons(false);
  };

  const sendMessage = () => {
    console.log('🔥 ChatWidget - sendMessage called with input:', inputState.inputValue);
    console.log('🔥 Current states:');
    console.log('  - expectingSerialNumber:', inputState.expectingSerialNumber);
    console.log('  - allowSerialNumberEntry:', inputState.allowSerialNumberEntry);
    console.log('  - expectingModel:', inputState.expectingModel);
    console.log('  - allowTextInput:', allowTextInput);
    console.log('  - isInFlow:', isInFlow);
    console.log('  - showInitialButtons:', inputState.showInitialButtons);
    
    if (!inputState.inputValue.trim()) return;
    
    if (inputState.expectingSerialNumber && inputState.allowSerialNumberEntry && isSerialNumberFormat(inputState.inputValue)) {
      console.log('🔥 Processing as serial number');
      handleSerialNumberSubmit(inputState.inputValue);
      inputState.setInputValue('');
      inputState.setAllowSerialNumberEntry(false);
      return;
    }
    
    if (inputState.expectingModel && isModelFormat(inputState.inputValue)) {
      console.log('🔥 Processing as model name');
      handleModelSubmit(inputState.inputValue);
      inputState.setInputValue('');
      return;
    }
    
    console.log('🔥 Processing as regular message');
    const newMessage = {
      id: Date.now().toString(),
      text: inputState.inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);
    
    const userInput = inputState.inputValue.toLowerCase().trim();
    inputState.setInputValue('');

    // Handle help requests for finding serial number or model
    if (userInput.includes('help') && (userInput.includes('find') || userInput.includes('locate')) && userInput.includes('serial')) {
      addRegularMessageWithTyping([
        "I can help you find your serial number! Here's where to look:\n\nMost Common Locations:\nBack of the cart - Look for a white or silver label\nBottom/underside - May be on the base or frame\nNear the battery compartment - Sometimes inside or nearby\nOn the controller - Some models have it there\n\nWhat to look for:\nA label with \"S/N\" or \"Serial Number\"\nUsually starts with letters like \"AMI\" followed by numbers\nTypically 8-12 characters long\n\nOnce you find it, just type it here and I'll look up your cart information!"
      ], 1500);
      inputState.setExpectingSerialNumber(true);
      inputState.setAllowSerialNumberEntry(true);
      setTextInputAllowed(true);
      return;
    }

    if (userInput.includes('model') && (userInput.includes('help') || userInput.includes('what') || userInput.includes('which'))) {
      addRegularMessageWithTyping([
        "I can help you identify your Amigo model! Here are our main models:\n\nSmartShopper - Compact shopping cart, great for stores\nValueShopper - Affordable option with essential features\nVista - Mid-range model with enhanced comfort\nMax CR - Heavy-duty model for outdoor use\n\nWhere to find your model:\nLook for a label on your cart (same place as serial number)\nCheck your paperwork or receipt\nThe model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!"
      ], 1500);
      inputState.setExpectingModel(true);
      setTextInputAllowed(true);
      return;
    }

    // Only trigger the general flow if we're not already expecting input
    if (!isInFlow && !inputState.expectingSerialNumber && !inputState.expectingModel) {
      addRegularMessageWithTyping([
        "I can help you troubleshoot your Amigo cart. To provide the most accurate assistance, I can work with either:\n\nSerial number - for precise troubleshooting\nModel name - for general guidance\n\nWhich would you prefer to provide? Or if you need help finding either, just let me know!"
      ], 1500);
      
      setTimeout(() => {
        inputState.setShowInitialButtons(true);
        setTextInputAllowed(false);
      }, 2000);
      
    } else if ((inputState.expectingSerialNumber || inputState.expectingModel) && !isSerialNumberFormat(inputState.inputValue) && !isModelFormat(inputState.inputValue)) {
      addRegularMessageWithTyping([
        "I didn't recognize that as a serial number or model name. \n\nFor serial numbers: Look for 6+ characters with letters and numbers (often starting with AMI)\nFor models: Try SmartShopper, ValueShopper, Vista, or Max CR\n\nNeed help finding either? Just ask \"help find serial number\" or \"help identify model\" and I'll guide you!"
      ], 1500);
    }
  };

  const sendHorizontalMessage = () => {
    if (!inputState.inputValue.trim()) return;
    inputState.setInputValue('');
  };

  // DEBUG: Log the current state for input calculation
  console.log('🔥 ChatWidget - Calculating isInputDisabled:');
  console.log('  - allowTextInput:', allowTextInput);
  console.log('  - isInFlow:', isInFlow);
  console.log('  - currentStep:', currentStep);
  console.log('  - showInitialButtons:', inputState.showInitialButtons);
  console.log('  - expectingSerialNumber:', inputState.expectingSerialNumber);
  console.log('  - allowSerialNumberEntry:', inputState.allowSerialNumberEntry);

  const isInputDisabled = !allowTextInput || (isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0) || inputState.showInitialButtons;
  
  console.log('🔥 ChatWidget - Final isInputDisabled:', isInputDisabled);

  // Create custom step with buttons when we should show initial buttons
  const customStep = inputState.showInitialButtons ? {
    id: 'custom_help_options',
    botMessage: "",
    userOptions: [
      { text: "Enter serial number", nextStep: "" },
      { text: "Enter model name", nextStep: "" },
      { text: "I'm not sure", nextStep: "" }
    ]
  } : null;

  const displayStep = customStep || currentStep;
  
  console.log('🔥 ChatWidget - displayStep:', displayStep);
  console.log('🔥 ChatWidget - customStep:', customStep);

  if (chatStateManager.chatState === 'hidden') {
    return <ChatButton onClick={chatStateManager.handleChatButtonClick} />;
  }

  if (chatStateManager.chatState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={inputState.inputValue}
        setInputValue={inputState.setInputValue}
        sendMessage={sendHorizontalMessage}
        onClose={handleClose}
        onSuggestedAction={handleSuggestedAction}
        onSerialNumberSubmit={handleSerialNumberSubmit}
      />
    );
  }

  if (chatStateManager.chatState === 'modal') {
    return (
      <ModalChat
        conversationHistory={conversationHistory}
        inputValue={inputState.inputValue}
        setInputValue={inputState.setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onModalToSidebar={chatStateManager.handleModalToSidebar}
        isInFlow={isInFlow}
        currentStep={displayStep}
        onFlowChoice={customStep ? handleSuggestedAction : handleFlowChoice}
        isTyping={isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  if (chatStateManager.chatState === 'sidebar') {
    return (
      <SidebarChat
        conversationHistory={conversationHistory}
        inputValue={inputState.inputValue}
        setInputValue={inputState.setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onMinimize={chatStateManager.handleMinimize}
        isInFlow={isInFlow}
        currentStep={displayStep}
        onFlowChoice={customStep ? handleSuggestedAction : handleFlowChoice}
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
