
import { useState, useCallback, useReducer } from 'react';
import { botMessages } from '@/data/botMessages';
import { lookupSerialNumber, determineFlowFromModel } from '@/services/serialNumberService';

// Define the possible views our chat can be in
type ChatView = 'closed' | 'horizontal' | 'modal' | 'sidebar';

// Define the shape of a message
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

// Define the shape of our state
interface ChatState {
  view: ChatView;
  conversationHistory: Message[];
  isTyping: boolean;
  currentStep: any;
}

// Define the actions our reducer can handle
type ChatAction =
  | { type: 'SET_VIEW'; view: ChatView }
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'ADD_MESSAGES'; messages: Message[] }
  | { type: 'SET_TYPING'; isTyping: boolean }
  | { type: 'SET_CURRENT_STEP'; step: any }
  | { type: 'CLEAR_HISTORY' };

// The reducer function is a pure function that calculates the next state
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.view };
    case 'ADD_MESSAGE':
      return { ...state, conversationHistory: [...state.conversationHistory, action.message] };
    case 'ADD_MESSAGES':
      return { ...state, isTyping: false, conversationHistory: [...state.conversationHistory, ...action.messages] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.isTyping };
    case 'SET_CURRENT_STEP':
      return { ...state, isTyping: false, currentStep: action.step };
    case 'CLEAR_HISTORY':
      return { ...state, conversationHistory: [], currentStep: null };
    default:
      return state;
  }
};

const initialState: ChatState = {
  view: 'horizontal',
  conversationHistory: [],
  isTyping: false,
  currentStep: null,
};

// The final, stable hook
export const useChat = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', message: userMessage });
    
    // Check if we're in serial collection mode and the input looks like a serial number
    if (state.currentStep?.id === 'serial_collection') {
      setInputValue('');
      dispatch({ type: 'SET_TYPING', isTyping: true });
      
      try {
        console.log('Looking up serial number:', inputValue);
        const productInfo = await lookupSerialNumber(inputValue);
        
        if (productInfo) {
          const flow = determineFlowFromModel(productInfo.model);
          const botResponse: Message = {
            id: `${Date.now() + 1}-${Math.random()}`,
            text: `Great! I found your ${productInfo.model}. Let me help you with that.`,
            sender: 'agent',
            timestamp: new Date(),
          };
          dispatch({ type: 'ADD_MESSAGE', message: botResponse });
          dispatch({ type: 'SET_TYPING', isTyping: false });
        } else {
          const botResponse: Message = {
            id: `${Date.now() + 1}-${Math.random()}`,
            text: "I couldn't find that serial number in our system. Could you please double-check it?",
            sender: 'agent',
            timestamp: new Date(),
          };
          dispatch({ type: 'ADD_MESSAGE', message: botResponse });
          dispatch({ type: 'SET_TYPING', isTyping: false });
        }
      } catch (error) {
        console.error('Error looking up serial number:', error);
        const botResponse: Message = {
          id: `${Date.now() + 1}-${Math.random()}`,
          text: "I'm having trouble looking up that serial number right now. Please try again later.",
          sender: 'agent',
          timestamp: new Date(),
        };
        dispatch({ type: 'ADD_MESSAGE', message: botResponse });
        dispatch({ type: 'SET_TYPING', isTyping: false });
      }
      return;
    }
    
    setInputValue('');
    dispatch({ type: 'SET_TYPING', isTyping: true });
    
    setTimeout(() => {
      const botResponse: Message = {
        id: `${Date.now() + 1}-${Math.random()}`,
        text: "Thank you for your message. How can I help you today?",
        sender: 'agent',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', message: botResponse });
      dispatch({ type: 'SET_TYPING', isTyping: false });
    }, 1000);
  }, [inputValue, state.currentStep]);

  const sendSuggestedAction = useCallback((actionText: string) => {
    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text: actionText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    const botResponse: Message = {
      id: `${Date.now() + 1}-${Math.random()}`,
      text: botMessages.initialOptionsPrompt,
      sender: 'agent',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGES', messages: [userMessage, botResponse] });
    dispatch({ type: 'SET_CURRENT_STEP', step: { 
      id: 'custom_serial_options',
      userOptions: [
        { text: "Serial number", nextStep: "" },
        { text: "Model name", nextStep: "" },
        { text: "I'm not sure", nextStep: "" }
      ]
    }});

    dispatch({ type: 'SET_VIEW', view: 'modal' });
  }, []);

  const sendSerialNumber = useCallback(async (serialNumber: string) => {
    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text: serialNumber,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', message: userMessage });
    dispatch({ type: 'SET_TYPING', isTyping: true });

    try {
      console.log('Looking up serial number via sendSerialNumber:', serialNumber);
      const productInfo = await lookupSerialNumber(serialNumber);
      
      if (productInfo) {
        const flow = determineFlowFromModel(productInfo.model);
        const botResponse: Message = {
          id: `${Date.now() + 1}-${Math.random()}`,
          text: `Perfect! I found your ${productInfo.model}. How can I help you with it today?`,
          sender: 'agent',
          timestamp: new Date(),
        };
        dispatch({ type: 'ADD_MESSAGE', message: botResponse });
        dispatch({ type: 'SET_TYPING', isTyping: false });
      } else {
        const botResponse: Message = {
          id: `${Date.now() + 1}-${Math.random()}`,
          text: "I couldn't locate that serial number. Could you verify it's correct?",
          sender: 'agent',
          timestamp: new Date(),
        };
        dispatch({ type: 'ADD_MESSAGE', message: botResponse });
        dispatch({ type: 'SET_TYPING', isTyping: false });
      }
    } catch (error) {
      console.error('Error in sendSerialNumber:', error);
      const botResponse: Message = {
        id: `${Date.now() + 1}-${Math.random()}`,
        text: "I'm experiencing technical difficulties. Please try again.",
        sender: 'agent',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', message: botResponse });
      dispatch({ type: 'SET_TYPING', isTyping: false });
    }
  }, []);

  const handleFlowChoice = useCallback((choice: string) => {
    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text: choice,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', message: userMessage });
    dispatch({ type: 'SET_CURRENT_STEP', step: null });
    dispatch({ type: 'SET_TYPING', isTyping: true });

    setTimeout(() => {
      let responseText = "Thank you for your selection.";
      if (choice.includes("Serial number")) {
        responseText = botMessages.serialNumberHelp;
        dispatch({ type: 'SET_CURRENT_STEP', step: {
          id: 'serial_collection',
          userOptions: [{ text: "I can't find it", nextStep: "" }]
        }});
      }

      const botResponse: Message = {
        id: `${Date.now() + 1}-${Math.random()}`,
        text: responseText,
        sender: 'agent',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', message: botResponse });
      dispatch({ type: 'SET_TYPING', isTyping: false });
    }, 1000);
  }, []);

  const closeChat = useCallback(() => {
    dispatch({ type: 'SET_VIEW', view: 'closed' });
  }, []);

  const openSidebar = useCallback(() => {
    dispatch({ type: 'SET_VIEW', view: 'sidebar' });
  }, []);

  const openModal = useCallback(() => {
    dispatch({ type: 'SET_VIEW', view: 'modal' });
  }, []);

  const openHorizontal = useCallback(() => {
    dispatch({ type: 'SET_VIEW', view: 'horizontal' });
  }, []);

  const downloadTranscript = useCallback(() => {
    const transcript = state.conversationHistory
      .map(msg => `${msg.sender}: ${msg.text}`)
      .join('\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [state.conversationHistory]);

  const clearChatHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  // Return a clean API for the UI to use
  return {
    // State
    view: state.view,
    conversationHistory: state.conversationHistory,
    isTyping: state.isTyping,
    currentStep: state.currentStep,
    inputValue,
    isInputDisabled: state.isTyping,
    shouldShowButtons: Boolean(state.currentStep?.userOptions?.length),
    
    // Actions
    setInputValue,
    sendMessage,
    sendSuggestedAction,
    sendSerialNumber,
    handleFlowChoice,
    closeChat,
    openSidebar,
    openModal,
    openHorizontal,
    downloadTranscript,
    clearChatHistory,
  };
};
