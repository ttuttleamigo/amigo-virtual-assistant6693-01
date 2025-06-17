import { useState, useEffect } from 'react';
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

const CHAT_HISTORY_KEY = 'amigo-chat-history';

// Helper functions for localStorage
const loadChatHistory = (): ConversationMessage[] => {
  try {
    const stored = localStorage.getItem(CHAT_HISTORY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error loading chat history:', error);
  }
  return [];
};

const saveChatHistory = (history: ConversationMessage[]) => {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const useConversationFlow = () => {
  const [currentStep, setCurrentStep] = useState<string>('greeting');
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInFlow, setIsInFlow] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowType>('general');
  const [isTyping, setIsTyping] = useState(false);
  const [allowTextInput, setAllowTextInput] = useState(true);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = loadChatHistory();
    if (savedHistory.length > 0) {
      setConversationHistory(savedHistory);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (conversationHistory.length > 0) {
      saveChatHistory(conversationHistory);
    }
  }, [conversationHistory]);

  // Helper function to get the starting step for each flow type
  const getStartingStepName = (flowType: FlowType): string => {
    switch (flowType) {
      case 'contactAgent':
        return 'contact_agent';
      case 'endConversation':
        return 'end_conversation';
      default:
        return 'greeting';
    }
  };

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
    }, delay);
  };

  const startFlow = (flowType: FlowType = 'general') => {
    setActiveFlow(flowType);
    setIsInFlow(true);
    
    const startingStepName = getStartingStepName(flowType);
    setCurrentStep(startingStepName);
    setAllowTextInput(false);
    
    const flow = flowMap[flowType];
    const startingStep = flow[startingStepName];
    
    if (startingStep) {
      const botMessages = Array.isArray(startingStep.botMessage) 
        ? startingStep.botMessage 
        : [startingStep.botMessage];
      
      addMessageWithTyping(botMessages);
    }
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
    setActiveFlow('general');
    setIsTyping(false);
    setAllowTextInput(true);
  };

  const clearChatHistory = () => {
    setConversationHistory([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
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

  const downloadTranscript = () => {
    const transcript = conversationHistory
      .filter(msg => msg.text !== 'typing')
      .map(msg => {
        const timestamp = msg.timestamp.toLocaleString();
        const sender = msg.sender === 'user' ? 'Customer' : 'Amigo Assistant';
        return `[${timestamp}] ${sender}: ${msg.text}`;
      })
      .join('\n\n');
    
    const header = `Amigo Chat Transcript\nGenerated: ${new Date().toLocaleString()}\nFlow: ${activeFlow}\nCurrent Step: ${currentStep}\n${'='.repeat(50)}\n\n`;
    
    const fullTranscript = header + transcript;
    
    const blob = new Blob([fullTranscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `amigo-chat-transcript-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    currentStep: getCurrentStep(),
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
    setTextInputAllowed,
    downloadTranscript,
    clearChatHistory
  };
};
