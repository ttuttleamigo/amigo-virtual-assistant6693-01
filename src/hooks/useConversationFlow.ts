
import { useState } from 'react';
import { conversationFlow, ConversationStep } from '@/data/conversationFlow';
import { smartShopperFlow } from '@/data/smartShopperFlow';
import { valueShopperFlow } from '@/data/valueShopperFlow';
import { vistaFlow } from '@/data/vistaFlow';
import { maxCRFlow } from '@/data/maxCRFlow';
import { contactAgentFlow } from '@/data/contactAgentFlow';
import { endConversationFlow } from '@/data/endConversationFlow';

export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  isFlowMessage?: boolean;
}

export type FlowType = 'general' | 'smartShopper' | 'valueShopper' | 'vista' | 'maxCR' | 'contactAgent' | 'endConversation';

const flowMap = {
  general: conversationFlow,
  smartShopper: smartShopperFlow,
  valueShopper: valueShopperFlow,
  vista: vistaFlow,
  maxCR: maxCRFlow,
  contactAgent: contactAgentFlow,
  endConversation: endConversationFlow
};

export const useConversationFlow = () => {
  const [currentStep, setCurrentStep] = useState<string>('greeting');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInFlow, setIsInFlow] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowType>('general');
  const [isTyping, setIsTyping] = useState(false);
  const [allowTextInput, setAllowTextInput] = useState(true);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const getCurrentStep = (): ConversationStep | null => {
    const flow = flowMap[activeFlow];
    return flow[currentStep] || null;
  };

  const addTypingMessage = () => {
    const typingMessage: ConversationMessage = {
      id: `typing-${Date.now()}`,
      text: 'typing',
      sender: 'agent',
      timestamp: new Date(),
      isFlowMessage: true
    };
    setIsTyping(true);
    setShowUserOptions(false); // Hide options while typing
    setConversationHistory(prev => [...prev, typingMessage]);
    return typingMessage.id;
  };

  const removeTypingMessage = (typingId: string) => {
    setIsTyping(false);
    setConversationHistory(prev => prev.filter(msg => msg.id !== typingId));
  };

  const addMessageWithTyping = (messages: string[], delay: number = 1500) => {
    const typingId = addTypingMessage();
    
    setTimeout(() => {
      removeTypingMessage(typingId);
      
      const newMessages: ConversationMessage[] = messages.map((message, index) => ({
        id: `bot-${Date.now()}-${index}`,
        text: message,
        sender: 'agent' as const,
        timestamp: new Date(),
        isFlowMessage: true
      }));

      setConversationHistory(prev => [...prev, ...newMessages]);
      
      // Show user options after bot message is complete
      setTimeout(() => {
        setShowUserOptions(true);
      }, 100);
    }, delay);
  };

  const startFlow = (flowType: FlowType = 'general') => {
    setActiveFlow(flowType);
    setIsInFlow(true);
    setCurrentStep('greeting');
    setAllowTextInput(false); // Disable text input when in flow
    setShowUserOptions(false); // Hide options initially
    const flow = flowMap[flowType];
    const greetingStep = flow.greeting;
    
    // Add bot messages with typing delay
    const botMessages = Array.isArray(greetingStep.botMessage) 
      ? greetingStep.botMessage 
      : [greetingStep.botMessage];
    
    addMessageWithTyping(botMessages);
  };

  const handleUserChoice = (choice: string, nextStep: string) => {
    setShowUserOptions(false); // Hide options immediately when user makes choice
    
    // Add user message
    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      text: choice,
      sender: 'user',
      timestamp: new Date(),
      isFlowMessage: true
    };

    setConversationHistory(prev => [...prev, userMessage]);

    // Move to next step
    setCurrentStep(nextStep);
    
    // Add bot response with typing delay
    const flow = flowMap[activeFlow];
    const nextStepData = flow[nextStep];
    if (nextStepData) {
      const botMessages = Array.isArray(nextStepData.botMessage) 
        ? nextStepData.botMessage 
        : [nextStepData.botMessage];
      
      addMessageWithTyping(botMessages, 1000);
    }
  };

  const resetFlow = () => {
    setIsInFlow(false);
    setCurrentStep('greeting');
    setConversationHistory([]);
    setActiveFlow('general');
    setIsTyping(false);
    setAllowTextInput(true); // Re-enable text input when flow is reset
    setShowUserOptions(false);
  };

  const addRegularMessage = (message: ConversationMessage) => {
    setConversationHistory(prev => [...prev, message]);
  };

  const addRegularMessageWithTyping = (messages: string[], delay: number = 1500) => {
    addMessageWithTyping(messages, delay);
  };

  const setTextInputAllowed = (allowed: boolean) => {
    setAllowTextInput(allowed);
  };

  return {
    currentStep: showUserOptions ? getCurrentStep() : null, // Only return current step when options should be shown
    conversationHistory,
    isInFlow,
    activeFlow,
    isTyping,
    allowTextInput,
    startFlow,
    handleUserChoice,
    resetFlow,
    addRegularMessage,
    addRegularMessageWithTyping,
    setTextInputAllowed
  };
};
