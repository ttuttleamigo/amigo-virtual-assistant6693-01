
import { ChatState, ChatAction } from './types';

export const initialState: ChatState = {
  uiState: 'horizontal',
  inputValue: '',
  isTyping: false,
  mode: 'idle',
  showInitialButtons: false,
  showHelpOptions: false,
  isInputDisabled: false,
};

export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
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
      console.log('[DEBUG] State Machine Reducer: ENTER_DIAGNOSTIC_FLOW - clearing all button states');
      return { 
        ...state, 
        mode: 'idle', 
        isTyping: false,
        showInitialButtons: false,
        showHelpOptions: false,
        isInputDisabled: false
      };
    default:
      console.log('[DEBUG] State Machine Reducer: Unknown action type:', action);
      return state;
  }
};
