
import { useState } from 'react';
import { conversationFlow, ConversationStep } from '@/data/conversationFlow';
import { smartShopperFlow } from '@/data/smartShopperFlow';
import { valueShopperFlow } from '@/data/valueShopperFlow';

export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  isFlowMessage?: boolean;
}

export type FlowType = 'general' | 'smartShopper' | 'valueShopper';

const flowMap = {
  general: conversationFlow,
  smartShopper: smartShopperFlow,
  valueShopper: valueShopperFlow
};

export const useConversationFlow = () => {
  const [currentStep, setCurrentStep] = useState<string>('greeting');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInFlow, setIsInFlow] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowType>('general');

  const getCurrentStep = (): ConversationStep | null => {
    const flow = flowMap[activeFlow];
    return flow[currentStep] || null;
  };

  const startFlow = (flowType: FlowType = 'general') => {
    setActiveFlow(flowType);
    setIsInFlow(true);
    setCurrentStep('greeting');
    const flow = flowMap[flowType];
    const greetingStep = flow.greeting;
    
    // Add bot messages
    const botMessages = Array.isArray(greetingStep.botMessage) 
      ? greetingStep.botMessage 
      : [greetingStep.botMessage];
    
    const newMessages: ConversationMessage[] = botMessages.map((message, index) => ({
      id: `bot-${Date.now()}-${index}`,
      text: message,
      sender: 'agent' as const,
      timestamp: new Date(),
      isFlowMessage: true
    }));

    setConversationHistory(newMessages);
  };

  const handleUserChoice = (choice: string, nextStep: string) => {
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
    
    // Add bot response after a short delay
    setTimeout(() => {
      const flow = flowMap[activeFlow];
      const nextStepData = flow[nextStep];
      if (nextStepData) {
        const botMessages = Array.isArray(nextStepData.botMessage) 
          ? nextStepData.botMessage 
          : [nextStepData.botMessage];
        
        const newBotMessages: ConversationMessage[] = botMessages.map((message, index) => ({
          id: `bot-${Date.now()}-${index}`,
          text: message,
          sender: 'agent' as const,
          timestamp: new Date(),
          isFlowMessage: true
        }));

        setConversationHistory(prev => [...prev, ...newBotMessages]);
      }
    }, 500);
  };

  const resetFlow = () => {
    setIsInFlow(false);
    setCurrentStep('greeting');
    setConversationHistory([]);
    setActiveFlow('general');
  };

  const addRegularMessage = (message: ConversationMessage) => {
    setConversationHistory(prev => [...prev, message]);
  };

  return {
    currentStep: getCurrentStep(),
    conversationHistory,
    isInFlow,
    activeFlow,
    startFlow,
    handleUserChoice,
    resetFlow,
    addRegularMessage
  };
};
