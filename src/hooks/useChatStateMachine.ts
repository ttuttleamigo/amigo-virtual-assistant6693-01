
import { useReducer, useCallback } from 'react';
import { FlowType, ConversationMessage } from '@/hooks/useConversationFlow';
import { lookupSerialNumber, determineFlowFromModel } from '@/services/serialNumberService';

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
  switch (action.type) {
    case 'SET_UI_STATE':
      return { ...state, uiState: action.state };
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.value };
    case 'SET_TYPING':
      return { ...state, isTyping: action.isTyping };
    case 'SET_MODE':
      return { ...state, mode: action.mode };
    case 'SHOW_OPTIONS':
      return { 
        ...state, 
        showInitialButtons: true, 
        showHelpOptions: false,
        isInputDisabled: true 
      };
    case 'SHOW_HELP_OPTIONS':
      return { 
        ...state, 
        showInitialButtons: false, 
        showHelpOptions: true,
        isInputDisabled: true 
      };
    case 'START_SERIAL_COLLECTION':
      return { 
        ...state, 
        mode: 'collecting_serial', 
        showInitialButtons: false, 
        showHelpOptions: false,
        isInputDisabled: false 
      };
    case 'START_MODEL_COLLECTION':
      return { 
        ...state, 
        mode: 'collecting_model', 
        showInitialButtons: false, 
        showHelpOptions: false,
        isInputDisabled: false 
      };
    case 'RESET_STATE':
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
      return state;
  }
};

export const useChatStateMachine = (
  addRegularMessage: (message: ConversationMessage) => void,
  addRegularMessageWithTyping: (messages: string[], delay?: number) => void,
  startFlow: (flowType: FlowType) => void
) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

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

  // UI State handlers
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

  // Fixed action handler to properly route to correct flows
  const handleSuggestedAction = useCallback((action: string) => {
    console.log('handleSuggestedAction called with:', action);
    
    if (action === "I need help with an Amigo cart repair") {
      dispatch({ type: 'SET_UI_STATE', state: 'modal' });
      
      const userMessage: ConversationMessage = {
        id: Date.now().toString(),
        text: action,
        sender: 'user',
        timestamp: new Date()
      };
      addRegularMessage(userMessage);

      const botResponse = "I can help you troubleshoot your Amigo cart. To provide the most accurate assistance, I can work with either:\n\nSerial number - for precise troubleshooting\nModel name - for general guidance\n\nWhich would you prefer to provide? Or if you need help finding either, just let me know!";
      
      addRegularMessageWithTyping([botResponse], 1500);
      
      setTimeout(() => {
        dispatch({ type: 'SHOW_OPTIONS' });
      }, 2000);
    }
  }, [addRegularMessage, addRegularMessageWithTyping]);

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
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow, dispatch]);

  const handleModelSubmit = useCallback((model: string) => {
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
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow, dispatch]);

  const handleHelpButtonClick = useCallback((action: string) => {
    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    if (action === "Help find serial number" || action === "I can't find it") {
      addRegularMessageWithTyping([
        "I can help you find your serial number! Here's where to look:\n\n**Most Common Locations:**\n• **Back of the cart** - Look for a white or silver label\n• **Bottom/underside** - May be on the base or frame\n• **Near the battery compartment** - Sometimes inside or nearby\n• **On the controller** - Some models have it there\n\n**What to look for:**\n• A label with \"S/N\" or \"Serial Number\"\n• Usually starts with letters like \"AMI\" followed by numbers\n• Typically 8-12 characters long\n\n**Still can't find it?**\n• Check your purchase receipt or documentation\n• Look for any stickers or labels with numbers and letters\n• Try different angles and lighting\n\nOnce you find it, please enter it below and I'll look up your cart information!"
      ], 1500);
      
      setTimeout(() => {
        dispatch({ type: 'START_SERIAL_COLLECTION' });
      }, 2000);
      
    } else if (action === "Help identify model") {
      addRegularMessageWithTyping([
        "I can help you identify your Amigo model! Here are our main models:\n\nSmartShopper - Compact shopping cart, great for stores\nValueShopper - Affordable option with essential features\nVista - Mid-range model with enhanced comfort\nMax CR - Heavy-duty model for outdoor use\n\nWhere to find your model:\n• Look for a label on your cart (same place as serial number)\n• Check your paperwork or receipt\n• The model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!"
      ], 1500);
      
      setTimeout(() => {
        dispatch({ type: 'START_MODEL_COLLECTION' });
      }, 2000);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, dispatch]);

  const setInputValue = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT_VALUE', value });
  }, []);

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
