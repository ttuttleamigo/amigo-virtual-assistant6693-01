import { useReducer, useCallback } from 'react';
import { FlowType, ConversationMessage } from '@/hooks/useConversationFlow';
import { lookupSerialNumber, determineFlowFromModel } from '@/services/serialNumberService';
import { botMessages } from '@/data/botMessages';
import { ChatView } from './useChatViewManager';

export type ChatUIState = 'hidden' | 'horizontal' | 'modal' | 'sidebar';
export type ChatMode = 'idle' | 'collecting_serial' | 'collecting_model';

interface ChatState {
  uiState: ChatUIState;
  inputValue: string;
  isTyping: boolean;
  mode: ChatMode;
  showInitialButtons: boolean;
  showHelpOptions: boolean;
  isInputDisabled: boolean;
  productInfo?: any;
}

type ChatAction = 
  | { type: 'SET_UI_STATE'; state: ChatUIState }
  | { type: 'SET_INPUT_VALUE'; value: string }
  | { type: 'SET_TYPING'; isTyping: boolean }
  | { type: 'SET_MODE'; mode: ChatMode }
  | { type: 'SHOW_OPTIONS' }
  | { type: 'SHOW_HELP_OPTIONS' }
  | { type: 'START_SERIAL_COLLECTION' }
  | { type: 'START_MODEL_COLLECTION' }
  | { type: 'RESET_STATE' }
  | { type: 'SET_INPUT_DISABLED'; disabled: boolean }
  | { type: 'START_PROCESSING' }
  | { type: 'SET_PRODUCT_INFO'; productInfo: any }
  | { type: 'ENTER_DIAGNOSTIC_FLOW' };

const initialState: ChatState = {
  uiState: 'horizontal',
  inputValue: '',
  isTyping: false,
  mode: 'idle',
  showInitialButtons: false,
  showHelpOptions: false,
  isInputDisabled: false,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  console.log('[DEBUG] State Machine Reducer: Action dispatched:', action.type, 'Current state:', state);
  
  switch (action.type) {
    case 'SET_UI_STATE':
      console.log('[DEBUG] State Machine Reducer: Setting UI state to:', action.state);
      return { ...state, uiState: action.state };
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.value };
    case 'SET_TYPING':
      console.log('[DEBUG] State Machine Reducer: Setting typing to:', action.isTyping);
      return { ...state, isTyping: action.isTyping };
    case 'SET_MODE':
      console.log('[DEBUG] State Machine Reducer: Setting mode to:', action.mode);
      return { ...state, mode: action.mode };
    case 'SHOW_OPTIONS':
      console.log('[DEBUG] State Machine Reducer: SHOW_OPTIONS - setting showInitialButtons to true');
      const newState = { 
        ...state, 
        showInitialButtons: true, 
        showHelpOptions: false,
        isInputDisabled: true 
      };
      console.log('[DEBUG] State Machine Reducer: SHOW_OPTIONS - new state:', newState);
      return newState;
    case 'SHOW_HELP_OPTIONS':
      console.log('[DEBUG] State Machine Reducer: SHOW_HELP_OPTIONS - setting showHelpOptions to true');
      return { 
        ...state, 
        showInitialButtons: false, 
        showHelpOptions: true,
        isInputDisabled: true 
      };
    case 'START_SERIAL_COLLECTION':
      console.log('[DEBUG] State Machine Reducer: START_SERIAL_COLLECTION');
      return { 
        ...state, 
        mode: 'collecting_serial', 
        showInitialButtons: false, 
        showHelpOptions: false,
        isInputDisabled: false 
      };
    case 'START_MODEL_COLLECTION':
      console.log('[DEBUG] State Machine Reducer: START_MODEL_COLLECTION');
      return { 
        ...state, 
        mode: 'collecting_model', 
        showInitialButtons: false, 
        showHelpOptions: false,
        isInputDisabled: false 
      };
    case 'RESET_STATE':
      console.log('[DEBUG] State Machine Reducer: RESET_STATE');
      return { 
        ...state, 
        mode: 'idle', 
        showInitialButtons: false, 
        showHelpOptions: false,
        isInputDisabled: false 
      };
    case 'SET_INPUT_DISABLED':
      return { ...state, isInputDisabled: action.disabled };
    case 'START_PROCESSING':
      return { ...state, isTyping: true };
    case 'SET_PRODUCT_INFO':
      return { ...state, productInfo: action.productInfo };
    case 'ENTER_DIAGNOSTIC_FLOW':
      return { ...state, mode: 'idle', isTyping: false };
    default:
      console.log('[DEBUG] State Machine Reducer: Unknown action type:', action);
      return state;
  }
};

export const useChatStateMachine = (
  addRegularMessage: (message: ConversationMessage) => void,
  addRegularMessageWithTyping: (messages: string[], delay?: number) => void,
  startFlow: (flowType: FlowType) => void,
  setView: (view: ChatView) => void
) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // ALL useCallback hooks must be declared unconditionally
  const isSerialNumberFormat = useCallback((text: string): boolean => {
    const cleanText = text.replace(/\s+/g, '').toUpperCase();
    return /^[A-Z0-9]{6,}$/.test(cleanText) || /^\d{6,}$/.test(cleanText);
  }, []);

  const isModelFormat = useCallback((text: string): boolean => {
    const cleanText = text.toLowerCase().trim();
    return cleanText.includes('smartshopper') || 
           cleanText.includes('smart shopper') ||
           cleanText.includes('valueshopper') || 
           cleanText.includes('value shopper') ||
           cleanText.includes('vista') ||
           cleanText.includes('max cr') ||
           cleanText.includes('maxcr') ||
           /^(ss|vs|v|mc)\d*$/.test(cleanText);
  }, []);

  const handleChatButtonClick = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'horizontal' });
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'hidden' });
  }, []);

  const handleModalToSidebar = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'sidebar' });
  }, []);

  const handleMinimize = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'horizontal' });
  }, []);

  const handleSuggestedAction = useCallback((action: string) => {
    console.log('[DEBUG] State Machine: handleSuggestedAction started for action:', action);
    console.log('[DEBUG] State Machine: Current state before action:', state);
    
    if (action === "I need help with an Amigo cart repair") {
      console.log('[DEBUG] State Machine: Processing repair help request');
      
      const userMessage: ConversationMessage = {
        id: `${Date.now()}-${Math.random()}`,
        text: action,
        sender: 'user',
        timestamp: new Date()
      };
      console.log('[DEBUG] State Machine: About to add user message:', userMessage);
      addRegularMessage(userMessage);
      console.log('[DEBUG] State Machine: User message added');

      console.log('[DEBUG] State Machine: About to generate bot response with typing');
      addRegularMessageWithTyping([botMessages.repairHelpResponse], 1500);
      console.log('[DEBUG] State Machine: Bot response initiated');
      
      console.log('[DEBUG] State Machine: Setting timeout to show options in 2 seconds');
      setTimeout(() => {
        console.log('[DEBUG] State Machine: Timeout triggered - about to dispatch SHOW_OPTIONS');
        console.log('[DEBUG] State Machine: Current state before SHOW_OPTIONS:', state);
        dispatch({ type: 'SHOW_OPTIONS' });
        setView('modal');
        console.log('[DEBUG] State Machine: SHOW_OPTIONS dispatched and modal view set');
      }, 2000);
      
      console.log('[DEBUG] State Machine: handleSuggestedAction completed for repair help');
    } else {
      console.log('[DEBUG] State Machine: Unhandled action:', action);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, state, setView]);

  const handleSerialNumberSubmit = useCallback(async (serialNumber: string) => {
    const userMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: `My serial number is: ${serialNumber}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    dispatch({ type: 'START_PROCESSING' });
    addRegularMessageWithTyping([botMessages.lookingUpProduct], 500);

    try {
      const productData = await lookupSerialNumber(serialNumber);
      
      if (productData && productData.model) {
        dispatch({ type: 'SET_PRODUCT_INFO', productInfo: productData });
        
        const flowType = determineFlowFromModel(productData.model);
        
        let successText = botMessages.productFoundTemplate.replace('{model}', productData.model);
        if (productData.purchaseDate) {
          successText = botMessages.productFoundWithDateTemplate
            .replace('{model}', productData.model)
            .replace('{purchaseDate}', productData.purchaseDate);
        }
        
        setTimeout(() => {
          addRegularMessageWithTyping([successText], 1000);
          
          setTimeout(() => {
            startFlow(flowType);
            dispatch({ type: 'ENTER_DIAGNOSTIC_FLOW' });
          }, 2500);
        }, 1500);
        
      } else {
        setTimeout(() => {
          addRegularMessageWithTyping([botMessages.serialNotFound], 1000);
          
          dispatch({ type: 'SET_MODE', mode: 'idle' });
          dispatch({ type: 'SET_INPUT_DISABLED', disabled: false });
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        addRegularMessageWithTyping([botMessages.lookupError], 1000);
        
        dispatch({ type: 'SET_MODE', mode: 'idle' });
        dispatch({ type: 'SET_INPUT_DISABLED', disabled: false });
      }, 1500);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow]);

  const handleModelSubmit = useCallback((model: string) => {
    const userMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: `My model is: ${model}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    const flowType = determineFlowFromModel(model);
    
    const responseText = botMessages.modelStartTroubleshooting.replace('{model}', model);
    addRegularMessageWithTyping([responseText], 1000);
    
    setTimeout(() => {
      startFlow(flowType);
      dispatch({ type: 'ENTER_DIAGNOSTIC_FLOW' });
    }, 2500);
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow]);

  const handleHelpButtonClick = useCallback((action: string) => {
    const userMessage: ConversationMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: action,
      sender: 'user',
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    if (action === "Help find serial number" || action === "I can't find it") {
      addRegularMessageWithTyping([botMessages.serialNumberExtendedHelp], 1500);
      
      setTimeout(() => {
        dispatch({ type: 'START_SERIAL_COLLECTION' });
      }, 2000);
      
    } else if (action === "Help identify model") {
      addRegularMessageWithTyping([botMessages.modelIdentificationHelp], 1500);
      
      setTimeout(() => {
        dispatch({ type: 'START_MODEL_COLLECTION' });
      }, 2000);
    }
  }, [addRegularMessage, addRegularMessageWithTyping]);

  const setInputValue = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT_VALUE', value });
  }, []);

  console.log('[DEBUG] State Machine: Current state returned to useChat:', state);

  return {
    state,
    dispatch,
    isSerialNumberFormat,
    isModelFormat,
    handleSuggestedAction,
    handleSerialNumberSubmit,
    handleModelSubmit,
    handleHelpButtonClick,
    handleChatButtonClick,
    handleClose,
    handleModalToSidebar,
    handleMinimize,
    setInputValue
  };
};
