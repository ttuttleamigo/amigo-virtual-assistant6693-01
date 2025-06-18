
import { useCallback } from 'react';
import { ConversationMessage } from '@/hooks/useConversationFlow';
import { lookupSerialNumber, determineFlowFromModel } from '@/services/serialNumberService';
import { botMessages } from '@/data/botMessages';
import { ChatState, ChatAction, ChatStateMachineProps } from './types';

export const useHandlers = (
  state: ChatState,
  dispatch: React.Dispatch<ChatAction>,
  { addRegularMessage, addRegularMessageWithTyping, startFlow, setView }: ChatStateMachineProps
) => {
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
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'hidden' });
  }, [dispatch]);

  const handleModalToSidebar = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'sidebar' });
  }, [dispatch]);

  const handleMinimize = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', state: 'horizontal' });
  }, [dispatch]);

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
  }, [addRegularMessage, addRegularMessageWithTyping, state, setView, dispatch]);

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
          
          setTimeout(() => {
            addRegularMessageWithTyping(["Would you like to try entering your model name instead, or would you prefer to contact our support team directly?"], 1000);
            dispatch({ type: 'SHOW_FALLBACK_OPTIONS' });
          }, 2000);
        }, 1500);
      }
    } catch (error) {
      console.error('Serial number lookup failed:', error);
      dispatch({ type: 'API_ERROR' });
      
      setTimeout(() => {
        addRegularMessageWithTyping(["I'm having trouble looking up that serial number right now. Would you like to try entering your model name instead, or contact our support team?"], 1000);
        
        setTimeout(() => {
          dispatch({ type: 'SHOW_FALLBACK_OPTIONS' });
        }, 1500);
      }, 1500);
    }
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow, dispatch]);

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
  }, [addRegularMessage, addRegularMessageWithTyping, startFlow, dispatch]);

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
  }, [addRegularMessage, addRegularMessageWithTyping, dispatch]);

  const setInputValue = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT_VALUE', value });
  }, [dispatch]);

  return {
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
