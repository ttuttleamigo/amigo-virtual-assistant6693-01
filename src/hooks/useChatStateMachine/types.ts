
import { FlowType, ConversationMessage } from '@/hooks/useConversationFlow';
import { ChatView } from '../useChatViewManager';

export type ChatUIState = 'hidden' | 'horizontal' | 'modal' | 'sidebar';
export type ChatMode = 'idle' | 'collecting_serial' | 'collecting_model';

export interface ChatState {
  uiState: ChatUIState;
  inputValue: string;
  isTyping: boolean;
  mode: ChatMode;
  showInitialButtons: boolean;
  showHelpOptions: boolean;
  isInputDisabled: boolean;
  productInfo?: any;
}

export type ChatAction = 
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

export interface ChatStateMachineProps {
  addRegularMessage: (message: ConversationMessage) => void;
  addRegularMessageWithTyping: (messages: string[], delay?: number) => void;
  startFlow: (flowType: FlowType) => void;
  setView: (view: ChatView) => void;
}
