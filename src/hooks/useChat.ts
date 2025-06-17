import { useState, useCallback } from 'react';
import { useConversationFlow, FlowType } from './useConversationFlow';
import { useChatStateMachine } from './useChatStateMachine';
import { botMessages } from '@/data/botMessages';

// Define the possible views our chat can be in
type ChatView = 'closed' | 'horizontal' | 'modal' | 'sidebar';

export const useChat = () => {
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

  // ADD VIEW STATE MANAGEMENT
  const [view, setView] = useState<ChatView>('closed');

  const handleFlowChoice = (choice: string, nextStep: string) => {
    handleUserChoice(choice, nextStep);
  };

  const handleClose = () => {
    chatMachine.handleClose();
    resetFlow();
    setView('closed'); // Close the chat view
  };

  // ADD HANDLERS TO CHANGE THE VIEW
  const openModal = useCallback(() => setView('modal'), []);
  const openSidebar = useCallback(() => setView('sidebar'), []);
  const openHorizontal = useCallback(() => setView('horizontal'), []);
  const closeChat = useCallback(() => setView('closed'), []);

  const handleCustomButtonClick = (action: string) => {
    console.log('handleCustomButtonClick called with:', action);
    
    if (action === "Serial number") {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: "Serial number",
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(userMessage);

      // Show serial number entry guidance
      addRegularMessageWithTyping([botMessages.serialNumberHelp], 1500);

      // Start serial number collection mode
      setTimeout(() => {
        chatMachine.dispatch({ type: 'START_SERIAL_COLLECTION' });
      }, 3000);
      
    } else if (action === "Model name") {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: "Model name",
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(userMessage);

      // Show model entry guidance
      addRegularMessageWithTyping([botMessages.modelNameHelp], 1500);

      // Start model collection mode
      setTimeout(() => {
        chatMachine.dispatch({ type: 'START_MODEL_COLLECTION' });
      }, 3000);
      
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
      addRegularMessageWithTyping([botMessages.imNotSureResponse], 1500);

      // Show options to help find either
      setTimeout(() => {
        chatMachine.dispatch({ type: 'SHOW_HELP_OPTIONS' });
      }, 2500);
      
    } else if (action === "I can't find it" || action === "Help find serial number" || action === "Help identify model") {
      chatMachine.handleHelpButtonClick(action);
    } else {
      chatMachine.handleSuggestedAction(action);
    }
  };

  // NEW FUNCTION FOR SUGGESTED ACTIONS
  const sendSuggestedAction = useCallback((action: string) => {
    console.log('sendSuggestedAction called with:', action);
    handleCustomButtonClick(action);
    // Automatically open modal after sending a suggested action
    setView('modal');
  }, []);

  const sendSerialNumber = (serialNumber: string) => {
    console.log('sendSerialNumber called with:', serialNumber);
    if (chatMachine.isSerialNumberFormat(serialNumber)) {
      chatMachine.handleSerialNumberSubmit(serialNumber);
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
      addRegularMessageWithTyping([botMessages.serialNumberDetailedHelp], 1500);
      chatMachine.dispatch({ type: 'START_SERIAL_COLLECTION' });
      return;
    }

    if (userInput.includes('model') && (userInput.includes('help') || userInput.includes('what') || userInput.includes('which'))) {
      addRegularMessageWithTyping([botMessages.modelIdentificationHelp], 1500);
      chatMachine.dispatch({ type: 'START_MODEL_COLLECTION' });
      return;
    }

    // Only trigger the general flow if we're not already expecting input
    if (!isInFlow && chatMachine.state.mode === 'idle') {
      addRegularMessageWithTyping([botMessages.initialTroubleshootingPrompt], 1500);
      
      setTimeout(() => {
        chatMachine.dispatch({ type: 'SHOW_OPTIONS' });
      }, 2000);
      
    } else if ((chatMachine.state.mode === 'collecting_serial' || chatMachine.state.mode === 'collecting_model') && !chatMachine.isSerialNumberFormat(chatMachine.state.inputValue) && !chatMachine.isModelFormat(chatMachine.state.inputValue)) {
      addRegularMessageWithTyping([botMessages.unrecognizedInput], 1500);
    }
  };

  // When in flow, prioritize conversation flow typing state over chat machine typing
  const isTypingIndicatorVisible = isInFlow ? isTyping : (isTyping || chatMachine.state.isTyping);

  // Simplified input disabled state - state machine is single source of truth
  const isInputDisabled = chatMachine.state.isInputDisabled;

  // Create proper custom step with matching bot message when showing initial buttons
  const customStep = chatMachine.state.showInitialButtons ? {
    id: 'custom_serial_options',
    botMessage: botMessages.initialOptionsPrompt,
    userOptions: [
      { text: "Serial number", nextStep: "" },
      { text: "Model name", nextStep: "" },
      { text: "I'm not sure", nextStep: "" }
    ]
  } : null;

  // Handle serial number collection state with custom buttons
  const serialCollectionStep = chatMachine.state.mode === 'collecting_serial' ? {
    id: 'serial_collection',
    botMessage: botMessages.serialNumberHelp,
    userOptions: [
      { text: "I can't find it", nextStep: "" }
    ]
  } : null;

  // Handle help options state
  const helpOptionsStep = chatMachine.state.showHelpOptions ? {
    id: 'help_options',
    botMessage: botMessages.imNotSureResponse,
    userOptions: [
      { text: "Find serial number", nextStep: "" },
      { text: "Identify model", nextStep: "" }
    ]
  } : null;

  // Clear display step logic - prioritize states in order
  const displayStep = serialCollectionStep || helpOptionsStep || customStep || (isInFlow && currentStep ? currentStep : null);

  // Visual components determine their own button visibility based on context
  const shouldShowButtons = Boolean(displayStep?.userOptions?.length);

  return {
    // State
    conversationHistory,
    inputValue: chatMachine.state.inputValue,
    isTyping: isTypingIndicatorVisible,
    isInputDisabled,
    currentStep: displayStep,
    shouldShowButtons,
    
    // NEW VIEW STATE AND HANDLERS
    view,
    openModal,
    openSidebar,
    openHorizontal,
    closeChat,
    
    // Actions
    setInputValue: chatMachine.setInputValue,
    sendMessage,
    sendSuggestedAction, // NEW EXPOSED FUNCTION
    sendSerialNumber,
    handleClose,
    handleFlowChoice: customStep ? handleCustomButtonClick : handleFlowChoice,
    handleModalToSidebar: chatMachine.handleModalToSidebar,
    handleMinimize: chatMachine.handleMinimize,
    handleChatButtonClick: () => setView('horizontal'), // UPDATED TO USE VIEW STATE
    downloadTranscript,
    clearChatHistory,
    
    // Flow state
    isInFlow,
    activeFlow
  };
};
