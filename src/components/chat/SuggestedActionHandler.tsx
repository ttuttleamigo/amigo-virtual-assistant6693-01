
import { FlowType } from '@/hooks/useConversationFlow';

export interface SuggestedActionHandlerProps {
  setChatState: (state: 'modal' | 'sidebar') => void;
  setPreviousState: (state: 'modal' | 'sidebar') => void;
  addRegularMessage: (message: any) => void;
  addRegularMessageWithTyping: (messages: string[], delay: number) => void;
  startFlow: (flowType: FlowType) => void;
  setShowInitialButtons: (show: boolean) => void;
  setTextInputAllowed: (allowed: boolean) => void;
  setExpectingSerialNumber: (expecting: boolean) => void;
  setAllowSerialNumberEntry: (allow: boolean) => void;
  setExpectingModel: (expecting: boolean) => void;
}

export const useSuggestedActionHandler = (props: SuggestedActionHandlerProps) => {
  const {
    setChatState,
    setPreviousState,
    addRegularMessage,
    addRegularMessageWithTyping,
    startFlow,
    setShowInitialButtons,
    setTextInputAllowed,
    setExpectingSerialNumber,
    setAllowSerialNumberEntry,
    setExpectingModel
  } = props;

  const handleSuggestedAction = (action: string, flowType?: FlowType) => {
    setChatState('modal');
    setPreviousState('modal');
    
    const newMessage = {
      id: Date.now().toString(),
      text: action,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);

    if (action === 'I need help with an Amigo cart repair') {
      addRegularMessageWithTyping([
        "I'd be happy to help you with your Amigo cart repair! For the most accurate troubleshooting steps, I'll need some information about your cart.\n\nYou can provide either:\nSerial number (found on a label, usually on the back or bottom of your cart)\nModel name (like SmartShopper, ValueShopper, Vista, or Max CR)\n\nIf you're not sure where to find either, just let me know and I can help guide you!"
      ], 1500);
      
      setTimeout(() => {
        setShowInitialButtons(true);
        setTextInputAllowed(false);
      }, 2000);
      
    } else if (action === 'I need to buy a part for an Amigo cart') {
      addRegularMessageWithTyping([
        "I can help you with ordering parts for your Amigo cart! You can order parts through several methods:\n\nCall our parts department at 1-800-692-6446\nEmail parts@amigomobility.com\nVisit our website at amigomobility.com/parts\n\nPlease have your cart's model number and serial number ready when ordering. Would you like help finding your serial number?"
      ], 1500);
      setTextInputAllowed(false);
    } else if (action === 'I have a different customer service need') {
      setTimeout(() => {
        startFlow('contactAgent');
      }, 1500);
    } else if (action === 'Enter serial number') {
      addRegularMessageWithTyping([
        "Great! Please enter your serial number. You can find it on a label, usually on the back or bottom of your cart."
      ], 1000);
      
      // Critical fix: Set the states immediately after the message, not with delay
      // This prevents the general flow from interfering
      setExpectingSerialNumber(true);
      setAllowSerialNumberEntry(true);
      setTextInputAllowed(true);
      setShowInitialButtons(false);
      
    } else if (action === 'Enter model name') {
      addRegularMessageWithTyping([
        "Perfect! Please enter your model name. Common models include SmartShopper, ValueShopper, Vista, or Max CR."
      ], 1000);
      
      // Critical fix: Set the states immediately after the message, not with delay
      setExpectingModel(true);
      setTextInputAllowed(true);
      setShowInitialButtons(false);
      
    } else if (action === "I'm not sure") {
      addRegularMessageWithTyping([
        "No problem! I can help you find the information we need. Here are some options:\n\nI can guide you on where to find your serial number\nI can help you identify your model\nYou can contact our support team at 1-800-692-6446\n\nWhat would you prefer?"
      ], 1500);
      setTextInputAllowed(false);
      setShowInitialButtons(false);
    }
  };

  return { handleSuggestedAction };
};
