
import { useState } from 'react';
import { conversationFlow, ConversationStep } from '@/data/conversationFlow';

export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  isFlowMessage?: boolean;
}

export const useConversationFlow = () => {
  const [currentStep, setCurrentStep] = useState<string>('greeting');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInFlow, setIsInFlow] = useState(false);

  const getCurrentStep = (): ConversationStep | null => {
    return conversationFlow[currentStep] || null;
  };

  const startFlow = () => {
    setIsInFlow(true);
    setCurrentStep('greeting');
    const greetingStep = conversationFlow.greeting;
    
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
      const nextStepData = conversationFlow[nextStep];
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
  };

  const addRegularMessage = (message: ConversationMessage) => {
    setConversationHistory(prev => [...prev, message]);
  };

  return {
    currentStep: getCurrentStep(),
    conversationHistory,
    isInFlow,
    startFlow,
    handleUserChoice,
    resetFlow,
    addRegularMessage
  };
};
