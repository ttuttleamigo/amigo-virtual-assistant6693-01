
import { useConversationFlow } from './useConversationFlow';
import { useChatStateMachine } from './useChatStateMachine';
import { useChatViewManager } from './useChatViewManager';
import { useChatActions } from './useChatActions';
import { FlowType } from './useConversationFlow';
import { botMessages } from '@/data/botMessages';

export const useChat = () => {
  console.log('[DEBUG] useChat hook called');
  
  // 1. Call all our specialized hooks
  const conversationFlow = useConversationFlow();
  console.log('[DEBUG] conversationFlow initialized');
  
  const viewManager = useChatViewManager('horizontal'); // Start with horizontal view
  console.log('[DEBUG] viewManager initialized with view:', viewManager.view);

  const chatMachine = useChatStateMachine(
    conversationFlow.addRegularMessage,
    conversationFlow.addRegularMessageWithTyping,
    (flowType: FlowType) => {
      chatMachine.dispatch({ type: 'SET_TYPING', isTyping: false });
      conversationFlow.startFlow(flowType);
    },
    viewManager.setViewMode
  );
  console.log('[DEBUG] chatMachine initialized');

  const actions = useChatActions({
    chatMachine,
    addRegularMessage: conversationFlow.addRegularMessage,
    addRegularMessageWithTyping: conversationFlow.addRegularMessageWithTyping,
    startFlow: conversationFlow.startFlow,
    setView: viewManager.setViewMode,
    isInFlow: conversationFlow.isInFlow,
  });
  console.log('[DEBUG] actions initialized');

  // 2. Handle any logic that combines state from multiple hooks
  const isTypingIndicatorVisible = conversationFlow.isInFlow 
    ? conversationFlow.isTyping 
    : (conversationFlow.isTyping || chatMachine.state.isTyping);

  // Create proper custom step with matching bot message when showing initial buttons
  console.log('[DEBUG] useChat: Checking for customStep - showInitialButtons:', chatMachine.state.showInitialButtons);
  const customStep = chatMachine.state.showInitialButtons ? {
    id: 'custom_serial_options',
    botMessage: botMessages.initialOptionsPrompt,
    userOptions: [
      { text: "Serial number", nextStep: "" },
      { text: "Model name", nextStep: "" },
      { text: "I'm not sure", nextStep: "" }
    ]
  } : null;
  console.log('[DEBUG] useChat: customStep created:', customStep);

  // Handle serial number collection state with custom buttons
  console.log('[DEBUG] useChat: Checking for serialCollectionStep - mode:', chatMachine.state.mode);
  const serialCollectionStep = chatMachine.state.mode === 'collecting_serial' ? {
    id: 'serial_collection',
    botMessage: botMessages.serialNumberHelp,
    userOptions: [
      { text: "I can't find it", nextStep: "" }
    ]
  } : null;
  console.log('[DEBUG] useChat: serialCollectionStep created:', serialCollectionStep);

  // Handle help options state
  console.log('[DEBUG] useChat: Checking for helpOptionsStep - showHelpOptions:', chatMachine.state.showHelpOptions);
  const helpOptionsStep = chatMachine.state.showHelpOptions ? {
    id: 'help_options',
    botMessage: botMessages.imNotSureResponse,
    userOptions: [
      { text: "Help find serial number", nextStep: "" },
      { text: "Help identify model", nextStep: "" }
    ]
  } : null;
  console.log('[DEBUG] useChat: helpOptionsStep created:', helpOptionsStep);

  // Clear display step logic - prioritize states in order
  const displayStep = serialCollectionStep || helpOptionsStep || customStep || (conversationFlow.isInFlow && conversationFlow.currentStep ? conversationFlow.currentStep : null);
  console.log('[DEBUG] useChat: Final displayStep determined:', displayStep);

  // Visual components determine their own button visibility based on context
  const shouldShowButtons = Boolean(displayStep?.userOptions?.length);
  console.log('[DEBUG] useChat: shouldShowButtons:', shouldShowButtons);

  const handleFlowChoice = customStep ? actions.handleCustomButtonClick : conversationFlow.handleUserChoice;

  const handleClose = () => {
    chatMachine.handleClose();
    conversationFlow.resetFlow();
    viewManager.closeChat();
  };

  // 3. Return a single, unified API for the UI to use
  const chatState = {
    // State
    conversationHistory: conversationFlow.conversationHistory,
    inputValue: chatMachine.state.inputValue,
    isTyping: isTypingIndicatorVisible,
    isInputDisabled: chatMachine.state.isInputDisabled,
    currentStep: displayStep,
    shouldShowButtons,
    
    // View state and handlers
    view: viewManager.view,
    openModal: viewManager.openModal,
    openSidebar: viewManager.openSidebar,
    openHorizontal: viewManager.openHorizontal,
    closeChat: viewManager.closeChat,
    
    // Actions
    setInputValue: chatMachine.setInputValue,
    sendMessage: actions.sendMessage,
    sendSuggestedAction: actions.sendSuggestedAction,
    sendSerialNumber: actions.sendSerialNumber,
    handleClose,
    handleFlowChoice,
    handleModalToSidebar: chatMachine.handleModalToSidebar,
    handleMinimize: chatMachine.handleMinimize,
    handleChatButtonClick: () => viewManager.setViewMode('horizontal'),
    downloadTranscript: conversationFlow.downloadTranscript,
    clearChatHistory: conversationFlow.clearChatHistory,
    
    // Flow state
    isInFlow: conversationFlow.isInFlow,
    activeFlow: conversationFlow.activeFlow
  };

  console.log('[DEBUG] useChat returning state with view:', chatState.view);
  console.log('[DEBUG] useChat returning chatState.currentStep:', chatState.currentStep);
  console.log('[DEBUG] useChat returning chatState.shouldShowButtons:', chatState.shouldShowButtons);
  return chatState;
};
