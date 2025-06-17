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
    (flowType: FlowType) => {
      // Clear chat machine typing state when starting a flow
      chatMachine.dispatch({ type: 'SET_TYPING', isTyping: false });
      startFlow(flowType);
    }
  );

  const handleFlowChoice = (choice: string, nextStep: string) => {
    handleUserChoice(choice, nextStep);
  };

  const handleClose = () => {
    chatMachine.handleClose();
    resetFlow();
  };

  const handleCustomButtonClick = (action: string) => {
    if (action === "Enter serial number") {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: "Enter serial number",
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(userMessage);

      // Show serial number entry guidance
      addRegularMessageWithTyping([
        "Please enter your cart's serial number. You can find it on a label, usually on the back or bottom of your cart:"
      ], 1500);

      // Start serial number collection mode
      setTimeout(() => {
        chatMachine.dispatch({ type: 'START_SERIAL_COLLECTION' });
      }, 2000);
      
    } else if (action === "Enter model name") {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: "Enter model name",
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(userMessage);

      // Show model entry guidance
      addRegularMessageWithTyping([
        "I can help you identify your Amigo model! Here are our main models:\n\nSmartShopper - Compact shopping cart, great for stores\nValueShopper - Affordable option with essential features\nVista - Mid-range model with enhanced comfort\nMax CR - Heavy-duty model for outdoor use\n\nWhere to find your model:\nLook for a label on your cart (same place as serial number)\nCheck your paperwork or receipt\nThe model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!"
      ], 1500);

      // Start model collection mode
      setTimeout(() => {
        chatMachine.dispatch({ type: 'START_MODEL_COLLECTION' });
      }, 2500);
      
    } else if (action === "I'm not sure") {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: "I'm not sure",
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(userMessage);

      // Show guidance for finding both serial number and model
      addRegularMessageWithTyping([
        "If you're not sure where to find either, just let me know and I can help guide you!"
      ], 1500);

      // Show options to help find either
      setTimeout(() => {
        chatMachine.dispatch({ type: 'SHOW_HELP_OPTIONS' });
      }, 2000);
      
    } else if (action === "I can't find it" || action === "Help find serial number" || action === "Help identify model") {
      chatMachine.handleHelpButtonClick(action);
    } else {
      chatMachine.handleSuggestedAction(action);
    }
  };

  const sendMessage = () => {
    if (!chatMachine.state.inputValue.trim()) return;
    
    // Handle different modes
    if (chatMachine.state.mode === 'collecting_serial' && chatMachine.isSerialNumberFormat(chatMachine.state.inputValue)) {
      chatMachine.handleSerialNumberSubmit(chatMachine.state.inputValue);
      chatMachine.setInputValue('');
      return;
    }
    
    if (chatMachine.state.mode === 'collecting_model' && chatMachine.isModelFormat(chatMachine.state.inputValue)) {
      chatMachine.handleModelSubmit(chatMachine.state.inputValue);
      chatMachine.setInputValue('');
      return;
    }
    
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

  // When in flow, prioritize conversation flow typing state over chat machine typing
  const isTypingIndicatorVisible = isInFlow ? isTyping : (isTyping || chatMachine.state.isTyping);

  // Simplified input disabled state - state machine is single source of truth
  const isInputDisabled = chatMachine.state.isInputDisabled;

  // Create proper custom step with matching bot message when showing initial buttons
  const customStep = chatMachine.state.showInitialButtons ? {
    id: 'custom_serial_options',
    botMessage: "For the most accurate troubleshooting steps, I'll need some information about your cart.\n\nYou can provide either:\n• Serial number (found on a label, usually on the back or bottom of your cart)\n• Model name (like SmartShopper, ValueShopper, Vista, or Max CR)\n\nIf you're not sure where to find either, just let me know and I can help guide you!",
    userOptions: [
      { text: "Enter serial number", nextStep: "" },
      { text: "Enter model name", nextStep: "" },
      { text: "I'm not sure", nextStep: "" }
    ]
  } : null;

  // Handle serial number collection state with custom buttons
  const serialCollectionStep = chatMachine.state.mode === 'collecting_serial' ? {
    id: 'serial_collection',
    botMessage: "Please enter your cart's serial number. You can find it on a label, usually on the back or bottom of your cart:",
    userOptions: [
      { text: "I can't find it", nextStep: "" }
    ]
  } : null;

  // Handle help options state
  const helpOptionsStep = chatMachine.state.showHelpOptions ? {
    id: 'help_options',
    botMessage: "If you're not sure where to find either, just let me know and I can help guide you!",
    userOptions: [
      { text: "Help find serial number", nextStep: "" },
      { text: "Help identify model", nextStep: "" }
    ]
  } : null;

  // Clear display step logic - prioritize states in order
  const displayStep = serialCollectionStep || helpOptionsStep || customStep || (isInFlow && currentStep ? currentStep : null);

  // If the state is hidden, show just the button (even though we start in horizontal now)
  if (chatMachine.state.uiState === 'hidden') {
    return <ChatButton onClick={chatMachine.handleChatButtonClick} />;
  }

  // If the state is horizontal, show the horizontal chat
  if (chatMachine.state.uiState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={chatMachine.state.inputValue}
        setInputValue={chatMachine.setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onSuggestedAction={chatMachine.handleSuggestedAction}
        onSerialNumberSubmit={chatMachine.handleSerialNumberSubmit}
      />
    );
  }

  // If the state is modal, show the modal chat
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
        isTyping={isTypingIndicatorVisible}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  // If the state is sidebar, show the sidebar chat
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
        isTyping={isTypingIndicatorVisible}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  return null;
};

export default ChatWidget;
