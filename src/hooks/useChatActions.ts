
import { useCallback } from 'react';
import { botMessages } from '@/data/botMessages';
import { useChatStateMachine } from './useChatStateMachine';
import { FlowType } from './useConversationFlow';
import { ChatView } from './useChatViewManager';

// Define the props this hook will need from other hooks
interface ChatActionsProps {
  chatMachine: ReturnType<typeof useChatStateMachine>;
  addRegularMessage: (message: any) => void;
  addRegularMessageWithTyping: (messages: string[], delay?: number) => void;
  startFlow: (flow: FlowType) => void;
  setView: (view: ChatView) => void;
  isInFlow: boolean;
}

export const useChatActions = ({
  chatMachine,
  addRegularMessage,
  addRegularMessageWithTyping,
  startFlow,
  setView,
  isInFlow,
}: ChatActionsProps) => {

  const handleCustomButtonClick = useCallback((action: string) => {
    console.log('handleCustomButtonClick called with:', action);
    
    if (action === "Serial number") {
      addRegularMessageWithTyping([botMessages.serialNumberHelp], 1500);
      setTimeout(() => {
        chatMachine.dispatch({ type: 'START_SERIAL_COLLECTION' });
      }, 3000);
      
    } else if (action === "Model name") {
      addRegularMessageWithTyping([botMessages.modelNameHelp], 1500);
      setTimeout(() => {
        chatMachine.dispatch({ type: 'START_MODEL_COLLECTION' });
      }, 3000);
      
    } else if (action === "I'm not sure") {
      addRegularMessageWithTyping([botMessages.imNotSureResponse], 1500);
      setTimeout(() => {
        chatMachine.dispatch({ type: 'SHOW_HELP_OPTIONS' });
      }, 2500);
      
    } else if (action === "I can't find it" || action === "Help find serial number" || action === "Help identify model") {
      chatMachine.handleHelpButtonClick(action);
    } else {
      chatMachine.handleSuggestedAction(action);
    }
  }, [addRegularMessageWithTyping, chatMachine]);

  const sendSuggestedAction = useCallback((action: string) => {
    console.log('[DEBUG] Step 1: sendSuggestedAction was called with:', action);
    handleCustomButtonClick(action);
    setView('modal');
  }, [handleCustomButtonClick, setView]);

  const sendMessage = useCallback(() => {
    const inputValue = chatMachine.state.inputValue;
    if (!inputValue.trim()) return;
    
    // Handle different modes
    if (chatMachine.state.mode === 'collecting_serial' && chatMachine.isSerialNumberFormat(inputValue)) {
      chatMachine.handleSerialNumberSubmit(inputValue);
      chatMachine.setInputValue('');
      return;
    }
    
    if (chatMachine.state.mode === 'collecting_model' && chatMachine.isModelFormat(inputValue)) {
      chatMachine.handleModelSubmit(inputValue);
      chatMachine.setInputValue('');
      return;
    }
    
    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);
    
    const userInput = inputValue.toLowerCase().trim();
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
      
    } else if ((chatMachine.state.mode === 'collecting_serial' || chatMachine.state.mode === 'collecting_model') && !chatMachine.isSerialNumberFormat(inputValue) && !chatMachine.isModelFormat(inputValue)) {
      addRegularMessageWithTyping([botMessages.unrecognizedInput], 1500);
    }
  }, [chatMachine, addRegularMessage, addRegularMessageWithTyping, isInFlow]);

  return {
    sendMessage,
    sendSuggestedAction,
    handleCustomButtonClick,
    sendSerialNumber: chatMachine.handleSerialNumberSubmit,
  };
};
