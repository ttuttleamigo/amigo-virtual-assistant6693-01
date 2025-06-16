
import { lookupSerialNumber, determineFlowFromModel, ProductInfo } from '@/services/serialNumberService';
import { FlowType } from '@/hooks/useConversationFlow';

export interface SerialNumberHandlerProps {
  setChatState: (state: 'modal' | 'sidebar') => void;
  setPreviousState: (state: 'modal' | 'sidebar') => void;
  setProductInfo: (info: ProductInfo | null) => void;
  addRegularMessage: (message: any) => void;
  addRegularMessageWithTyping: (messages: string[], delay: number) => void;
  startFlow: (flowType: FlowType) => void;
  setExpectingSerialNumber: (expecting: boolean) => void;
  setExpectingModel: (expecting: boolean) => void;
  setTextInputAllowed: (allowed: boolean) => void;
}

export const useSerialNumberHandler = (props: SerialNumberHandlerProps) => {
  const {
    setChatState,
    setPreviousState,
    setProductInfo,
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setExpectingSerialNumber,
    setExpectingModel,
    setTextInputAllowed
  } = props;

  const handleSerialNumberSubmit = async (serialNumber: string) => {
    setChatState('modal');
    setPreviousState('modal');
    
    const userMessage = {
      id: Date.now().toString(),
      text: `My serial number is: ${serialNumber}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    addRegularMessageWithTyping(["Looking up your product information..."], 500);

    try {
      const productData = await lookupSerialNumber(serialNumber);
      
      if (productData && productData.model) {
        setProductInfo(productData);
        
        const flowType = determineFlowFromModel(productData.model);
        
        let successText = `Found your ${productData.model}!`;
        if (productData.purchaseDate) {
          successText += ` (Purchased: ${productData.purchaseDate})`;
        }
        
        setTimeout(() => {
          addRegularMessageWithTyping([successText], 1000);
          
          setTimeout(() => {
            startFlow(flowType);
          }, 2500);
        }, 1500);
        
      } else {
        setTimeout(() => {
          addRegularMessageWithTyping([
            "I couldn't find that serial number in our system. Let me help you with some alternatives:\n\nTry again - Double-check the serial number (it's usually on a label on the back or bottom of your cart)\nEnter your model - If you know your cart model (like SmartShopper, ValueShopper, Vista, or Max CR), I can help based on that\nGet help locating - I can guide you on where to find your serial number\nContact support - Call 1-800-692-6446 for direct assistance\n\nWhat would you prefer to do?"
          ], 1000);
          
          setExpectingSerialNumber(true);
          setExpectingModel(true);
          setTextInputAllowed(true);
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        addRegularMessageWithTyping([
          "I'm having trouble looking up that serial number right now. Let me offer some alternatives:\n\nTry again - This might be a temporary connection issue\nEnter your model - If you know your cart model, I can help based on that\nFind your serial number - I can help you locate it on your cart\nContact support - Call 1-800-692-6446 for immediate assistance\n\nWhat would you like to do?"
        ], 1000);
        
        setExpectingSerialNumber(true);
        setExpectingModel(true);
        setTextInputAllowed(true);
      }, 1500);
    }
  };

  return { handleSerialNumberSubmit };
};
