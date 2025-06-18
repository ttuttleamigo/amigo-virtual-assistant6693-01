
import { useReducer } from 'react';
import { FlowType, ConversationMessage } from '@/hooks/useConversationFlow';
import { ChatView } from './useChatViewManager';
import { chatReducer, initialState } from './useChatStateMachine/reducer';
import { useHandlers } from './useChatStateMachine/handlers';
import { ChatStateMachineProps } from './useChatStateMachine/types';

export { ChatUIState, ChatMode } from './useChatStateMachine/types';

export const useChatStateMachine = (
  addRegularMessage: (message: ConversationMessage) => void,
  addRegularMessageWithTyping: (messages: string[], delay?: number) => void,
  startFlow: (flowType: FlowType) => void,
  setView: (view: ChatView) => void
) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const handlers = useHandlers(state, dispatch, {
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setView
  });

  console.log('[DEBUG] State Machine: Current state returned to useChat:', state);

  return {
    state,
    dispatch,
    ...handlers
  };
};
