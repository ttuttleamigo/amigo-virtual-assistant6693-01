
import { determineFlowFromModel } from '@/services/serialNumberService';
import { FlowType } from '@/hooks/useConversationFlow';

export interface ModelHandlerProps {
  setChatState: (state: 'modal' | 'sidebar') => void;
  setPreviousState: (state: 'modal' | 'sidebar') => void;
  addRegularMessage: (message: any) => void;
  addRegularMessageWithTyping: (messages: string[], delay: number) => void;
  startFlow: (flowType: FlowType) => void;
  setExpectingModel: (expecting: boolean) => void;
  setExpectingSerialNumber: (expecting: boolean) => void;
  setTextInputAllowed: (allowed: boolean) => void;
}

export const useModelHandler = (props: ModelHandlerProps) => {
  const {
    setChatState,
    setPreviousState,
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setExpectingModel,
    setExpectingSerialNumber,
    setTextInputAllowed
  } = props;

  const handleModelSubmit = (model: string) => {
    setChatState('modal');
    setPreviousState('modal');
    
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
    }, 2500);
    
    setExpectingModel(false);
    setExpectingSerialNumber(false);
    setTextInputAllowed(false);
  };

  return { handleModelSubmit };
};
