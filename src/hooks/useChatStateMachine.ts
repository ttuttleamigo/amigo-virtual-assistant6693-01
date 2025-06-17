
import { useState, useReducer, useCallback } from 'react';
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
  switch (action.type) {
    case 'SET_UI_STATE':
      return { ...state, uiState: action.uiState };
    
    case 'SET_PREVIOUS_UI_STATE':
      return { ...state, previousUIState: action.previousUIState };
    
    case 'SET_MODE':
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
        // Clear input disabled when hiding buttons, set when showing
        isInputDisabled: action.show
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
        isTyping: true,
        showInitialButtons: false
      };
    
    case 'SHOW_OPTIONS':
      return {
        ...state,
        mode: 'showing_options',
        showInitialButtons: true,
        isInputDisabled: true,
        uiState: state.uiState === 'horizontal' ? 'modal' : state.uiState,
        previousUIState: state.uiState === 'horizontal' ? 'modal' : state.previousUIState
      };
    
    case 'AUTO_SHOW_MAIN_OPTIONS':
      return {
        ...state,
        mode: 'showing_options',
        showInitialButtons: true,
        isInputDisabled: true,
        uiState: 'modal',
        previousUIState: 'modal'
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

  // UI Action Handlers
  const handleChatButtonClick = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', uiState: 'horizontal' });
    dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: 'horizontal' });
  }, []);

  const handleModalToSidebar = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_UI_STATE', uiState: 'sidebar' });
      dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: 'sidebar' });
    }, 250);
  }, []);

  const handleMinimize = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_UI_STATE', uiState: 'modal' });
      dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: 'modal' });
    }, 250);
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET_CHAT' });
  }, []);

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

  // Fixed action handler to follow proper flow specifications
  const handleSuggestedAction = useCallback(async (action: string) => {
    console.log('handleSuggestedAction called with:', action);
    
    try {
      // Add user message
      const newMessage = {
        id: Date.now().toString(),
        text: action,
        sender: 'user' as const,
        timestamp: new Date()
      };
      addRegularMessage(newMessage);

      // Handle the specific button actions
      if (action === 'Enter serial number') {
        addRegularMessageWithTyping([
          "Please enter your cart's serial number. You can find it on a label, usually on the back or bottom of your cart:"
        ], 1000);
        
        dispatch({ type: 'START_SERIAL_COLLECTION' });
        return;
      }
      
      if (action === 'Enter model name') {
        addRegularMessageWithTyping([
          "Please enter your cart's model name (like SmartShopper, ValueShopper, Vista, or Max CR):"
        ], 1000);
        
        dispatch({ type: 'START_MODEL_COLLECTION' });
        return;
      }
      
      if (action === "I'm not sure") {
        addRegularMessageWithTyping([
          "No problem! I can help you find your cart information. Here's what to look for:",
          "",
          "**Serial Number:**",
          "• Check the back of your cart for a white or silver label",
          "• Look on the bottom/underside of the cart",
          "• Sometimes found near the battery compartment",
          "• Usually starts with letters like 'AMI' followed by numbers",
          "",
          "**Model Name:**",
          "• Often printed on the same label as the serial number",
          "• Look for names like SmartShopper, ValueShopper, Vista, or Max CR",
          "• May also be on your paperwork or receipt",
          "",
          "Once you find either piece of information, just type it here and I'll help you with troubleshooting!"
        ], 1500);
        
        dispatch({ type: 'SET_MODE', mode: 'idle' });
        dispatch({ type: 'SET_INPUT_DISABLED', disabled: false });
        return;
      }

      // Transition to modal for main action options
      console.log('Transitioning to modal state');
      dispatch({ type: 'SET_UI_STATE', uiState: 'modal' });
      dispatch({ type: 'SET_PREVIOUS_UI_STATE', previousUIState: 'modal' });
      
      if (action === 'I need help with an Amigo cart repair') {
        // Send the first message
        addRegularMessageWithTyping([
          "I'd be happy to help you with your Amigo cart repair! For the most accurate troubleshooting steps, I'll need some information about your cart."
        ], 1500);
        
        // Send the second message after a delay
        setTimeout(() => {
          addRegularMessageWithTyping([
            "You can provide either:"
          ], 1000);
        }, 2500);
        
        // Send the third message with options after another delay
        setTimeout(() => {
          addRegularMessageWithTyping([
            "Serial number (found on a label, usually on the back or bottom of your cart)"
          ], 1000);
        }, 4000);
        
        // Send the fourth message
        setTimeout(() => {
          addRegularMessageWithTyping([
            "Model name (like SmartShopper, ValueShopper, Vista, or Max CR)"
          ], 1000);
        }, 5500);
        
        // Send the final message and show options
        setTimeout(() => {
          addRegularMessageWithTyping([
            "If you're not sure where to find either, just let me know and I can help guide you!"
          ], 1000);
          
          // Show the option buttons after all messages are sent
          setTimeout(() => {
            dispatch({ type: 'SHOW_OPTIONS' });
          }, 1500);
        }, 7000);
        
      } else if (action === 'I need to buy a part for an Amigo cart') {
        addRegularMessageWithTyping([
          "I can help you with ordering parts for your Amigo cart! You can order parts through several methods:",
          "• Call our parts department at 1-800-692-6446",
          "• Email parts@amigomobility.com", 
          "• Visit our website at amigomobility.com/parts",
          "",
          "Please have your cart's model number and serial number ready when ordering. Would you like help finding your serial number?"
        ], 1500);
        
        dispatch({ type: 'SET_MODE', mode: 'idle' });
        dispatch({ type: 'SET_INPUT_DISABLED', disabled: false });
        
      } else if (action === 'I have a different customer service need') {
        // This one goes to contact agent flow
        console.log('Starting contactAgent flow for general customer service');
        setTimeout(() => {
          startFlow('contactAgent');
          dispatch({ type: 'ENTER_DIAGNOSTIC_FLOW' });
        }, 500);
      }
      
    } catch (error) {
      console.error('Error in handleSuggestedAction:', error);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow]);

  const handleSerialNumberSubmit = useCallback(async (serialNumber: string) => {
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
