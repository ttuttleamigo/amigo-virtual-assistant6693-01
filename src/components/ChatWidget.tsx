
import React from 'react';
import { useConversationFlow, FlowType } from '@/hooks/useConversationFlow';
import { useChatStateMachine } from '@/hooks/useChatStateMachine';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';

const ChatWidget = () => {
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

  const chatMachine = useChatStateMachine(
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow
  );

  const handleFlowChoice = (choice: string, nextStep: string) => {
    console.log('🔥 ChatWidget - handleFlowChoice called:', choice, nextStep);
    handleUserChoice(choice, nextStep);
  };

  const handleClose = () => {
    chatMachine.handleClose();
    resetFlow();
  };

  // Enhanced custom button handler with detailed logging
  const handleCustomButtonClick = (action: string) => {
    console.log('🔥🔥🔥 ChatWidget - Custom button clicked:', action);
    console.log('🔥🔥🔥 Current state before click:', chatMachine.state);
    
    // Call the state machine's action handler
    chatMachine.handleSuggestedAction(action).then(() => {
      console.log('🔥🔥🔥 State after action completed:', chatMachine.state);
    }).catch((error) => {
      console.error('🔥🔥🔥 Error in handleSuggestedAction:', error);
    });
  };

  const sendMessage = () => {
    console.log('🔥 ChatWidget - sendMessage called with input:', chatMachine.state.inputValue);
    console.log('🔥 Current state:', chatMachine.state);
    
    if (!chatMachine.state.inputValue.trim()) return;
    
    // Handle different modes
    if (chatMachine.state.mode === 'collecting_serial' && chatMachine.isSerialNumberFormat(chatMachine.state.inputValue)) {
      console.log('🔥 Processing as serial number');
      chatMachine.handleSerialNumberSubmit(chatMachine.state.inputValue);
      chatMachine.setInputValue('');
      return;
    }
    
    if (chatMachine.state.mode === 'collecting_model' && chatMachine.isModelFormat(chatMachine.state.inputValue)) {
      console.log('🔥 Processing as model name');
      chatMachine.handleModelSubmit(chatMachine.state.inputValue);
      chatMachine.setInputValue('');
      return;
    }
    
    console.log('🔥 Processing as regular message');
    const newMessage = {
      id: Date.now().toString(),
      text: chatMachine.state.inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);
    
    const userInput = chatMachine.state.inputValue.toLowerCase().trim();
    chatMachine.setInputValue('');

    // Handle help requests for finding serial number or model
    if (userInput.includes('help') && (userInput.includes('find') || userInput.includes('locate')) && userInput.includes('serial')) {
      addRegularMessageWithTyping([
        "I can help you find your serial number! Here's where to look:\n\nMost Common Locations:\nBack of the cart - Look for a white or silver label\nBottom/underside - May be on the base or frame\nNear the battery compartment - Sometimes inside or nearby\nOn the controller - Some models have it there\n\nWhat to look for:\nA label with \"S/N\" or \"Serial Number\"\nUsually starts with letters like \"AMI\" followed by numbers\nTypically 8-12 characters long\n\nOnce you find it, just type it here and I'll look up your cart information!"
      ], 1500);
      chatMachine.dispatch({ type: 'START_SERIAL_COLLECTION' });
      return;
    }

    if (userInput.includes('model') && (userInput.includes('help') || userInput.includes('what') || userInput.includes('which'))) {
      addRegularMessageWithTyping([
        "I can help you identify your Amigo model! Here are our main models:\n\nSmartShopper - Compact shopping cart, great for stores\nValueShopper - Affordable option with essential features\nVista - Mid-range model with enhanced comfort\nMax CR - Heavy-duty model for outdoor use\n\nWhere to find your model:\nLook for a label on your cart (same place as serial number)\nCheck your paperwork or receipt\nThe model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!"
      ], 1500);
      chatMachine.dispatch({ type: 'START_MODEL_COLLECTION' });
      return;
    }

    // Only trigger the general flow if we're not already expecting input
    if (!isInFlow && chatMachine.state.mode === 'idle') {
      addRegularMessageWithTyping([
        "I can help you troubleshoot your Amigo cart. To provide the most accurate assistance, I can work with either:\n\nSerial number - for precise troubleshooting\nModel name - for general guidance\n\nWhich would you prefer to provide? Or if you need help finding either, just let me know!"
      ], 1500);
      
      setTimeout(() => {
        chatMachine.dispatch({ type: 'SHOW_OPTIONS' });
      }, 2000);
      
    } else if ((chatMachine.state.mode === 'collecting_serial' || chatMachine.state.mode === 'collecting_model') && !chatMachine.isSerialNumberFormat(chatMachine.state.inputValue) && !chatMachine.isModelFormat(chatMachine.state.inputValue)) {
      addRegularMessageWithTyping([
        "I didn't recognize that as a serial number or model name. \n\nFor serial numbers: Look for 6+ characters with letters and numbers (often starting with AMI)\nFor models: Try SmartShopper, ValueShopper, Vista, or Max CR\n\nNeed help finding either? Just ask \"help find serial number\" or \"help identify model\" and I'll guide you!"
      ], 1500);
    }
  };

  const sendHorizontalMessage = () => {
    if (!chatMachine.state.inputValue.trim()) return;
    chatMachine.setInputValue('');
  };

  // Calculate input disabled state
  const isInputDisabled = chatMachine.state.isInputDisabled || 
                         (isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0);

  // Create custom step with buttons when we should show initial buttons
  const customStep = chatMachine.state.showInitialButtons ? {
    id: 'custom_main_options',
    botMessage: "",
    userOptions: [
      { text: "I need help with an Amigo cart repair", nextStep: "" },
      { text: "I need to buy a part for an Amigo cart", nextStep: "" },
      { text: "I have a different customer service need", nextStep: "" }
    ]
  } : null;

  // Fix the display step logic
  const isExpectingManualInput = (chatMachine.state.mode === 'collecting_serial') || 
                                 (chatMachine.state.mode === 'collecting_model') || 
                                 chatMachine.state.showInitialButtons;
  
  const shouldShowFlowStep = isInFlow && currentStep && !isExpectingManualInput;
  const displayStep = customStep || (shouldShowFlowStep ? currentStep : null);
  
  console.log('🔥 ChatWidget - State machine mode:', chatMachine.state.mode);
  console.log('🔥 ChatWidget - showInitialButtons:', chatMachine.state.showInitialButtons);
  console.log('🔥 ChatWidget - customStep:', customStep);
  console.log('🔥 ChatWidget - displayStep:', displayStep);
  console.log('🔥🔥🔥 ChatWidget - Button handler function:', handleCustomButtonClick);

  if (chatMachine.state.uiState === 'hidden') {
    return <ChatButton onClick={chatMachine.handleChatButtonClick} />;
  }

  if (chatMachine.state.uiState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={chatMachine.state.inputValue}
        setInputValue={chatMachine.setInputValue}
        sendMessage={sendHorizontalMessage}
        onClose={handleClose}
        onSuggestedAction={chatMachine.handleSuggestedAction}
        onSerialNumberSubmit={chatMachine.handleSerialNumberSubmit}
      />
    );
  }

  if (chatMachine.state.uiState === 'modal') {
    return (
      <ModalChat
        conversationHistory={conversationHistory}
        inputValue={chatMachine.state.inputValue}
        setInputValue={chatMachine.setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onModalToSidebar={chatMachine.handleModalToSidebar}
        isInFlow={isInFlow}
        currentStep={displayStep}
        onFlowChoice={customStep ? handleCustomButtonClick : handleFlowChoice}
        isTyping={isTyping || chatMachine.state.isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  if (chatMachine.state.uiState === 'sidebar') {
    return (
      <SidebarChat
        conversationHistory={conversationHistory}
        inputValue={chatMachine.state.inputValue}
        setInputValue={chatMachine.setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onMinimize={chatMachine.handleMinimize}
        isInFlow={isInFlow}
        currentStep={displayStep}
        onFlowChoice={customStep ? handleCustomButtonClick : handleFlowChoice}
        isTyping={isTyping || chatMachine.state.isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  return null;
};

export default ChatWidget;
