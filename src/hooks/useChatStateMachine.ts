import { useState, useReducer, useCallback, useEffect } from 'react';
import { lookupSerialNumber, determineFlowFromModel, ProductInfo } from '@/services/serialNumberService';
import { FlowType } from '@/hooks/useConversationFlow';

export type ChatUIState = 'hidden' | 'horizontal' | 'modal' | 'sidebar';

export type ChatMode = 
  | 'idle'
  | 'collecting_serial' 
  | 'collecting_model'
  | 'processing_lookup'
  | 'generating_response'
  | 'in_diagnostic_flow'
  | 'showing_options';

export interface ChatState {
  // UI State
  uiState: ChatUIState;
  previousUIState: ChatUIState;
  
  // Chat Mode
  mode: ChatMode;
  
  // Input State
  inputValue: string;
  isInputDisabled: boolean;
  
  // Data State
  productInfo: ProductInfo | null;
  
  // UI Control State
  showInitialButtons: boolean;
  isTyping: boolean;
}

export type ChatAction = 
  | { type: 'SET_UI_STATE'; uiState: ChatUIState }
  | { type: 'SET_PREVIOUS_UI_STATE'; previousUIState: ChatUIState }
  | { type: 'SET_MODE'; mode: ChatMode }
  | { type: 'SET_INPUT_VALUE'; inputValue: string }
  | { type: 'SET_INPUT_DISABLED'; disabled: boolean }
  | { type: 'SET_PRODUCT_INFO'; productInfo: ProductInfo | null }
  | { type: 'SET_SHOW_INITIAL_BUTTONS'; show: boolean }
  | { type: 'SET_TYPING'; isTyping: boolean }
  | { type: 'RESET_CHAT' }
  | { type: 'START_SERIAL_COLLECTION' }
  | { type: 'START_MODEL_COLLECTION' }
  | { type: 'START_PROCESSING' }
  | { type: 'SHOW_OPTIONS' }
  | { type: 'AUTO_SHOW_MAIN_OPTIONS' }
  | { type: 'ENTER_DIAGNOSTIC_FLOW' };

const initialState: ChatState = {
  uiState: 'horizontal',
  previousUIState: 'horizontal',
  mode: 'idle',
  inputValue: '',
  isInputDisabled: false,
  productInfo: null,
  showInitialButtons: false,
  isTyping: false
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  console.log('🔥 ChatStateMachine - Action:', action.type, action);
  
  switch (action.type) {
    case 'SET_UI_STATE':
      return { ...state, uiState: action.uiState };
    
    case 'SET_PREVIOUS_UI_STATE':
      return { ...state, previousUIState: action.previousUIState };
    
    case 'SET_MODE':
      console.log('🔥 ChatStateMachine - Mode change:', state.mode, '->', action.mode);
      return { ...state, mode: action.mode };
    
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.inputValue };
    
    case 'SET_INPUT_DISABLED':
      return { ...state, isInputDisabled: action.disabled };
    
    case 'SET_PRODUCT_INFO':
      return { ...state, productInfo: action.productInfo };
    
    case 'SET_SHOW_INITIAL_BUTTONS':
      return { 
        ...state, 
        showInitialButtons: action.show,
        isInputDisabled: action.show // Disable input when showing buttons
      };
    
    case 'SET_TYPING':
      return { ...state, isTyping: action.isTyping };
    
    case 'RESET_CHAT':
      return {
        ...initialState,
        uiState: 'hidden'
      };
    
    case 'START_SERIAL_COLLECTION':
      return {
        ...state,
        mode: 'collecting_serial',
        showInitialButtons: false,
        isInputDisabled: false,
        uiState: state.uiState === 'horizontal' ? 'modal' : state.uiState,
        previousUIState: state.uiState === 'horizontal' ? 'modal' : state.previousUIState
      };
    
    case 'START_MODEL_COLLECTION':
      return {
        ...state,
        mode: 'collecting_model',
        showInitialButtons: false,
        isInputDisabled: false,
        uiState: state.uiState === 'horizontal' ? 'modal' : state.uiState,
        previousUIState: state.uiState === 'horizontal' ? 'modal' : state.previousUIState
      };
    
    case 'START_PROCESSING':
      return {
        ...state,
        mode: 'processing_lookup',
        isInputDisabled: true,
        isTyping: true
      };
    
    case 'SHOW_OPTIONS':
      return {
        ...state,
        mode: 'showing_options',
        showInitialButtons: true,
        isInputDisabled: true
      };
    
    case 'AUTO_SHOW_MAIN_OPTIONS':
      console.log('🔥 ChatStateMachine - Auto showing main options');
      return {
        ...state,
        mode: 'showing_options',
        showInitialButtons: true,
        isInputDisabled: true
      };
    
    case 'ENTER_DIAGNOSTIC_FLOW':
      return {
        ...state,
        mode: 'in_diagnostic_flow',
        showInitialButtons: false,
        isInputDisabled: true
      };
    
    default:
      return state;
  }
};

export interface ChatStateMachine {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  
  // UI Actions
  handleChatButtonClick: () => void;
  handleModalToSidebar: () => void;
  handleMinimize: () => void;
  handleClose: () => void;
  
  // Input Actions
  setInputValue: (value: string) => void;
  
  // Core Actions
  handleSuggestedAction: (action: string) => Promise<void>;
  handleSerialNumberSubmit: (serialNumber: string) => Promise<void>;
  handleModelSubmit: (model: string) => Promise<void>;
  
  // Utility Functions
  isSerialNumberFormat: (text: string) => boolean;
  isModelFormat: (text: string) => boolean;
}

export const useChatStateMachine = (
  addRegularMessage: (message: any) => void,
  addRegularMessageWithTyping: (messages: string[], delay: number) => void,
  startFlow: (flowType: FlowType) => void
): ChatStateMachine => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Auto-show main options when transitioning from horizontal to modal/sidebar
  useEffect(() => {
    if ((state.uiState === 'modal' || state.uiState === 'sidebar') && 
        state.mode === 'idle' && 
        !state.showInitialButtons) {
      console.log('🔥 ChatStateMachine - Auto-triggering main options');
      dispatch({ type: 'AUTO_SHOW_MAIN_OPTIONS' });
    }
  }, [state.uiState, state.mode, state.showInitialButtons]);

  // UI Action Handlers
  const handleChatButtonClick = useCallback(() => {
    if (state.previousUIState !== 'horizontal') {
      dispatch({ type: 'SET_UI_STATE', uiState: state.previousUIState });
    } else {
      dispatch({ type: 'SET_UI_STATE', uiState: 'horizontal' });
    }
  }, [state.previousUIState]);

  const handleModalToSidebar = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', uiState: 'sidebar' });
    dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: 'sidebar' });
  }, []);

  const handleMinimize = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', uiState: 'modal' });
    dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: 'modal' });
  }, []);

  const handleClose = useCallback(() => {
    if (state.uiState !== 'hidden' && state.uiState !== 'horizontal') {
      dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: state.uiState });
    }
    dispatch({ type: 'RESET_CHAT' });
  }, [state.uiState]);

  // Input Actions
  const setInputValue = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT_VALUE', inputValue: value });
  }, []);

  // Utility Functions
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

  // Core Action Handlers
  const handleSuggestedAction = useCallback(async (action: string) => {
    console.log('🔥 ChatStateMachine - handleSuggestedAction:', action);
    
    // Add user message
    const newMessage = {
      id: Date.now().toString(),
      text: action,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);

    if (action === 'Enter serial number') {
      addRegularMessageWithTyping([
        "Great! Please enter your serial number. You can find it on a label, usually on the back or bottom of your cart."
      ], 1000);
      
      dispatch({ type: 'START_SERIAL_COLLECTION' });
      
    } else if (action === 'Enter model name') {
      addRegularMessageWithTyping([
        "Perfect! Please enter your model name. Common models include SmartShopper, ValueShopper, Vista, or Max CR."
      ], 1000);
      
      dispatch({ type: 'START_MODEL_COLLECTION' });
      
    } else if (action === "I'm not sure") {
      addRegularMessageWithTyping([
        "No problem! I can help you find the information we need. Here are some options:\n\nI can guide you on where to find your serial number\nI can help you identify your model\nYou can contact our support team at 1-800-692-6446\n\nWhat would you prefer?"
      ], 1500);
      
      dispatch({ type: 'SET_MODE', mode: 'idle' });
      dispatch({ type: 'SET_SHOW_INITIAL_BUTTONS', show: false });
      
    } else if (action === 'I need help with an Amigo cart repair') {
      addRegularMessageWithTyping([
        "I'd be happy to help you with your Amigo cart repair! For the most accurate troubleshooting steps, I'll need some information about your cart.\n\nYou can provide either:\nSerial number (found on a label, usually on the back or bottom of your cart)\nModel name (like SmartShopper, ValueShopper, Vista, or Max CR)\n\nIf you're not sure where to find either, just let me know and I can help guide you!"
      ], 1500);
      
      setTimeout(() => {
        dispatch({ type: 'SHOW_OPTIONS' });
      }, 2000);
      
    } else if (action === 'I need to buy a part for an Amigo cart') {
      addRegularMessageWithTyping([
        "I can help you with ordering parts for your Amigo cart! You can order parts through several methods:\n\nCall our parts department at 1-800-692-6446\nEmail parts@amigomobility.com\nVisit our website at amigomobility.com/parts\n\nPlease have your cart's model number and serial number ready when ordering. Would you like help finding your serial number?"
      ], 1500);
      
      dispatch({ type: 'SET_INPUT_DISABLED', disabled: true });
      
    } else if (action === 'I have a different customer service need') {
      setTimeout(() => {
        startFlow('contactAgent');
        dispatch({ type: 'ENTER_DIAGNOSTIC_FLOW' });
      }, 1500);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow]);

  const handleSerialNumberSubmit = useCallback(async (serialNumber: string) => {
    console.log('🔥 ChatStateMachine - handleSerialNumberSubmit:', serialNumber);
    
    const userMessage = {
      id: Date.now().toString(),
      text: `My serial number is: ${serialNumber}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    dispatch({ type: 'START_PROCESSING' });
    addRegularMessageWithTyping(["Looking up your product information..."], 500);

    try {
      const productData = await lookupSerialNumber(serialNumber);
      
      if (productData && productData.model) {
        dispatch({ type: 'SET_PRODUCT_INFO', productInfo: productData });
        
        const flowType = determineFlowFromModel(productData.model);
        
        let successText = `Found your ${productData.model}!`;
        if (productData.purchaseDate) {
          successText += ` (Purchased: ${productData.purchaseDate})`;
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
          addRegularMessageWithTyping([
            "I couldn't find that serial number in our system. Let me help you with some alternatives:\n\nTry again - Double-check the serial number (it's usually on a label on the back or bottom of your cart)\nEnter your model - If you know your cart model (like SmartShopper, ValueShopper, Vista, or Max CR), I can help based on that\nGet help locating - I can guide you on where to find your serial number\nContact support - Call 1-800-692-6446 for direct assistance\n\nWhat would you prefer to do?"
          ], 1000);
          
          dispatch({ type: 'SET_MODE', mode: 'idle' });
          dispatch({ type: 'SET_INPUT_DISABLED', disabled: false });
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        addRegularMessageWithTyping([
          "I'm having trouble looking up that serial number right now. Let me offer some alternatives:\n\nTry again - This might be a temporary connection issue\nEnter your model - If you know your cart model, I can help based on that\nFind your serial number - I can help you locate it on your cart\nContact support - Call 1-800-692-6446 for immediate assistance\n\nWhat would you like to do?"
        ], 1000);
        
        dispatch({ type: 'SET_MODE', mode: 'idle' });
        dispatch({ type: 'SET_INPUT_DISABLED', disabled: false });
      }, 1500);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow]);

  const handleModelSubmit = useCallback(async (model: string) => {
    console.log('🔥 ChatStateMachine - handleModelSubmit:', model);
    
    const userMessage = {
      id: Date.now().toString(),
      text: `My model is: ${model}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    const flowType = determineFlowFromModel(model);
    
    addRegularMessageWithTyping([
      `Great! I can help you with your ${model}. Let me start the troubleshooting process for you.`
    ], 1000);
    
    setTimeout(() => {
      startFlow(flowType);
      dispatch({ type: 'ENTER_DIAGNOSTIC_FLOW' });
    }, 2500);
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow]);

  return {
    state,
    dispatch,
    handleChatButtonClick,
    handleModalToSidebar,
    handleMinimize,
    handleClose,
    setInputValue,
    handleSuggestedAction,
    handleSerialNumberSubmit,
    handleModelSubmit,
    isSerialNumberFormat,
    isModelFormat
  };
};
