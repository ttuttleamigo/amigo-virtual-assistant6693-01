
import React, { useState } from 'react';
import { useConversationFlow, FlowType } from '@/hooks/useConversationFlow';
import { lookupSerialNumber, determineFlowFromModel, ProductInfo } from '@/services/serialNumberService';
import ChatButton from './chat/ChatButton';
import HorizontalChat from './chat/HorizontalChat';
import ModalChat from './chat/ModalChat';
import SidebarChat from './chat/SidebarChat';

type ChatState = 'hidden' | 'horizontal' | 'modal' | 'sidebar';

const ChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>('horizontal');
  const [previousState, setPreviousState] = useState<ChatState>('horizontal'); // Track previous state
  const [inputValue, setInputValue] = useState('');
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [expectingSerialNumber, setExpectingSerialNumber] = useState(false);
  const [expectingModel, setExpectingModel] = useState(false);
  const [allowSerialNumberEntry, setAllowSerialNumberEntry] = useState(false);
  const { 
    currentStep, 
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
  } = useConversationFlow();

  // Function to check if a string looks like a serial number
  const isSerialNumberFormat = (text: string): boolean => {
    // Remove spaces and convert to uppercase
    const cleanText = text.replace(/\s+/g, '').toUpperCase();
    // Check if it matches common serial number patterns (letters and numbers, typically 6+ characters)
    return /^[A-Z0-9]{6,}$/.test(cleanText) || /^\d{6,}$/.test(cleanText);
  };

  // Function to check if a string looks like a model name
  const isModelFormat = (text: string): boolean => {
    const cleanText = text.toLowerCase().trim();
    // Check for common Amigo model patterns
    return cleanText.includes('smartshopper') || 
           cleanText.includes('smart shopper') ||
           cleanText.includes('valueshopper') || 
           cleanText.includes('value shopper') ||
           cleanText.includes('vista') ||
           cleanText.includes('max cr') ||
           cleanText.includes('maxcr') ||
           /^(ss|vs|v|mc)\d*$/.test(cleanText); // Common abbreviations
  };

  const handleSerialNumberSubmit = async (serialNumber: string) => {
    // Don't change state if we're already in sidebar - stay in sidebar
    if (chatState !== 'sidebar') {
      setChatState('modal');
      setPreviousState('modal'); // Update previous state
    }
    
    // Add user message with serial number
    const userMessage = {
      id: Date.now().toString(),
      text: `My serial number is: ${serialNumber}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    // Show loading message with typing
    addRegularMessageWithTyping(["Looking up your product information..."], 500);

    try {
      const productData = await lookupSerialNumber(serialNumber);
      
      if (productData && productData.model) {
        setProductInfo(productData);
        
        // Determine the appropriate flow based on the model
        const flowType = determineFlowFromModel(productData.model);
        
        // Create detailed success message with product info
        let successText = `Found your ${productData.model}!`;
        if (productData.purchaseDate) {
          successText += ` (Purchased: ${productData.purchaseDate})`;
        }
        
        // Add success message with typing delay
        setTimeout(() => {
          addRegularMessageWithTyping([successText], 1000);
          
          // Start the appropriate flow after another delay
          setTimeout(() => {
            startFlow(flowType);
          }, 2500);
        }, 1500);
        
      } else {
        // Serial number not found - offer helpful alternatives
        setTimeout(() => {
          addRegularMessageWithTyping([
            "I couldn't find that serial number in our system. Let me help you with some alternatives:\n\n• Try again - Double-check the serial number (it's usually on a label on the back or bottom of your cart)\n• Enter your model - If you know your cart model (like SmartShopper, ValueShopper, Vista, or Max CR), I can help based on that\n• Get help locating - I can guide you on where to find your serial number\n• Contact support - Call 1-800-692-6446 for direct assistance\n\nWhat would you prefer to do?"
          ], 1000);
          
          // Keep expecting serial number for retry
          setExpectingSerialNumber(true);
          setExpectingModel(true);
          setTextInputAllowed(true);
        }, 1500);
      }
    } catch (error) {
      // Error occurred during lookup - offer helpful alternatives
      setTimeout(() => {
        addRegularMessageWithTyping([
          "I'm having trouble looking up that serial number right now. Let me offer some alternatives:\n\n• Try again - This might be a temporary connection issue\n• Enter your model - If you know your cart model, I can help based on that\n• Find your serial number - I can help you locate it on your cart\n• Contact support - Call 1-800-692-6446 for immediate assistance\n\nWhat would you like to do?"
        ], 1000);
        
        // Keep expecting serial number for retry
        setExpectingSerialNumber(true);
        setExpectingModel(true);
        setTextInputAllowed(true);
      }, 1500);
    }
  };

  const handleModelSubmit = (model: string) => {
    // Don't change state if we're already in sidebar - stay in sidebar
    if (chatState !== 'sidebar') {
      setChatState('modal');
      setPreviousState('modal'); // Update previous state
    }
    
    // Add user message with model
    const userMessage = {
      id: Date.now().toString(),
      text: `My model is: ${model}`,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(userMessage);

    // Determine the appropriate flow based on the model
    const flowType = determineFlowFromModel(model);
    
    // Add confirmation message with typing delay
    addRegularMessageWithTyping([
      `Great! I can help you with your ${model}. Let me start the troubleshooting process for you.`
    ], 1000);
    
    // Start the appropriate flow after delay
    setTimeout(() => {
      startFlow(flowType);
    }, 2500);
    
    setExpectingModel(false);
    setExpectingSerialNumber(false);
    setTextInputAllowed(false);
  };

  const handleSuggestedAction = (action: string, flowType?: FlowType) => {
    setChatState('modal');
    setPreviousState('modal'); // Update previous state
    
    // Add user message
    const newMessage = {
      id: Date.now().toString(),
      text: action,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);

    // Handle different actions
    if (action === 'I need help with an Amigo cart repair') {
      // Ask for serial number first with helpful guidance and buttons
      addRegularMessageWithTyping([
        "I'd be happy to help you with your Amigo cart repair! For the most accurate troubleshooting steps, I'll need some information about your cart.\n\nYou can provide either:\n• Serial number (found on a label, usually on the back or bottom of your cart)\n• Model name (like SmartShopper, ValueShopper, Vista, or Max CR)\n\nIf you're not sure where to find either, just let me know and I can help guide you!"
      ], 1500);
      setExpectingSerialNumber(false);
      setExpectingModel(false);
      setAllowSerialNumberEntry(false);
      setTextInputAllowed(false);
    } else if (action === 'I need to buy a part for an Amigo cart') {
      // Direct to parts ordering
      addRegularMessageWithTyping([
        "I can help you with ordering parts for your Amigo cart! You can order parts through several methods:\n\n• Call our parts department at 1-800-692-6446\n• Email parts@amigomobility.com\n• Visit our website at amigomobility.com/parts\n\nPlease have your cart's model number and serial number ready when ordering. Would you like help finding your serial number?"
      ], 1500);
      setTextInputAllowed(false);
    } else if (action === 'I have a different customer service need') {
      // Start contact agent flow
      setTimeout(() => {
        startFlow('contactAgent');
      }, 1500);
    } else if (action === 'Enter serial number') {
      // Enable serial number entry
      addRegularMessageWithTyping([
        "Great! Please enter your serial number. You can find it on a label, usually on the back or bottom of your cart."
      ], 1000);
      setExpectingSerialNumber(true);
      setAllowSerialNumberEntry(true);
      setTextInputAllowed(true);
    } else if (action === 'Enter model name') {
      // Enable model entry
      addRegularMessageWithTyping([
        "Perfect! Please enter your model name. Common models include SmartShopper, ValueShopper, Vista, or Max CR."
      ], 1000);
      setExpectingModel(true);
      setTextInputAllowed(true);
    } else if (action === "I'm not sure") {
      // Provide guidance
      addRegularMessageWithTyping([
        "No problem! I can help you find the information we need. Here are some options:\n\n• I can guide you on where to find your serial number\n• I can help you identify your model\n• You can contact our support team at 1-800-692-6446\n\nWhat would you prefer?"
      ], 1500);
      setTextInputAllowed(false);
    }
  };

  const handleFlowChoice = (choice: string, nextStep: string) => {
    handleUserChoice(choice, nextStep);
  };

  const handleModalToSidebar = () => {
    setChatState('sidebar');
    setPreviousState('sidebar'); // Update previous state
  };

  const handleMinimize = () => {
    setChatState('modal'); // Changed from 'minimized' to 'modal'
    setPreviousState('modal'); // Update previous state
  };

  const handleClose = () => {
    // Store current state as previous before closing (but only if it's not horizontal)
    if (chatState !== 'hidden' && chatState !== 'horizontal') {
      setPreviousState(chatState);
    }
    setChatState('hidden');
    resetFlow();
    setProductInfo(null);
    setExpectingSerialNumber(false);
    setExpectingModel(false);
    setAllowSerialNumberEntry(false);
  };

  const handleChatButtonClick = () => {
    // Always restore to previous state if it's not horizontal, otherwise default to horizontal
    if (previousState !== 'horizontal') {
      setChatState(previousState);
    } else {
      setChatState('horizontal');
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Check if we're expecting a serial number and the input looks like one
    if (expectingSerialNumber && allowSerialNumberEntry && isSerialNumberFormat(inputValue)) {
      handleSerialNumberSubmit(inputValue);
      setInputValue('');
      setAllowSerialNumberEntry(false);
      return;
    }
    
    // Check if we're expecting a model and the input looks like one
    if (expectingModel && isModelFormat(inputValue)) {
      handleModelSubmit(inputValue);
      setInputValue('');
      return;
    }
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    addRegularMessage(newMessage);
    
    const userInput = inputValue.toLowerCase().trim();
    setInputValue('');

    // Handle specific requests for help
    if (userInput.includes('help') && (userInput.includes('find') || userInput.includes('locate')) && userInput.includes('serial')) {
      addRegularMessageWithTyping([
        "I can help you find your serial number! Here's where to look:\n\nMost Common Locations:\n• Back of the cart - Look for a white or silver label\n• Bottom/underside - May be on the base or frame\n• Near the battery compartment - Sometimes inside or nearby\n• On the controller - Some models have it there\n\nWhat to look for:\n• A label with \"S/N\" or \"Serial Number\"\n• Usually starts with letters like \"AMI\" followed by numbers\n• Typically 8-12 characters long\n\nOnce you find it, just type it here and I'll look up your cart information!"
      ], 1500);
      setExpectingSerialNumber(true);
      setAllowSerialNumberEntry(true);
      setTextInputAllowed(true);
      return;
    }

    if (userInput.includes('model') && (userInput.includes('help') || userInput.includes('what') || userInput.includes('which'))) {
      addRegularMessageWithTyping([
        "I can help you identify your Amigo model! Here are our main models:\n\nSmartShopper - Compact shopping cart, great for stores\nValueShopper - Affordable option with essential features\nVista - Mid-range model with enhanced comfort\nMax CR - Heavy-duty model for outdoor use\n\nWhere to find your model:\n• Look for a label on your cart (same place as serial number)\n• Check your paperwork or receipt\n• The model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!"
      ], 1500);
      setExpectingModel(true);
      setTextInputAllowed(true);
      return;
    }

    if (!isInFlow && !expectingSerialNumber && !expectingModel) {
      addRegularMessageWithTyping([
        "I can help you troubleshoot your Amigo cart. To provide the most accurate assistance, I can work with either:\n\nSerial number - for precise troubleshooting\nModel name - for general guidance\n\nWhich would you prefer to provide? Or if you need help finding either, just let me know!"
      ], 1500);
      setExpectingSerialNumber(false);
      setExpectingModel(false);
      setAllowSerialNumberEntry(false);
      setTextInputAllowed(false);
    } else if ((expectingSerialNumber || expectingModel) && !isSerialNumberFormat(inputValue) && !isModelFormat(inputValue)) {
      // User entered text that doesn't look like a serial number or model
      addRegularMessageWithTyping([
        "I didn't recognize that as a serial number or model name. \n\nFor serial numbers: Look for 6+ characters with letters and numbers (often starting with AMI)\nFor models: Try SmartShopper, ValueShopper, Vista, or Max CR\n\nNeed help finding either? Just ask \"help find serial number\" or \"help identify model\" and I'll guide you!"
      ], 1500);
    }
  };

  // Separate send message for horizontal chat that doesn't add to conversation history
  const sendHorizontalMessage = () => {
    if (!inputValue.trim()) return;
    
    // For horizontal chat, we just handle suggested actions, not free text
    // This prevents messages from horizontal appearing in modal/sidebar
    setInputValue('');
  };

  // Calculate if input should be disabled
  const isInputDisabled = !allowTextInput || (isInFlow && currentStep && currentStep.userOptions && currentStep.userOptions.length > 0);

  // Create custom step with buttons when not in flow and expecting input
  const customStep = (!isInFlow && !expectingSerialNumber && !expectingModel && conversationHistory.length > 0) ? {
    id: 'custom_help_options',
    botMessage: "",
    userOptions: [
      { text: "Enter serial number", nextStep: "" },
      { text: "Enter model name", nextStep: "" },
      { text: "I'm not sure", nextStep: "" }
    ]
  } : null;

  // Use custom step or current flow step
  const displayStep = customStep || currentStep;

  if (chatState === 'hidden') {
    return <ChatButton onClick={handleChatButtonClick} />;
  }

  if (chatState === 'horizontal') {
    return (
      <HorizontalChat
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendHorizontalMessage}
        onClose={handleClose}
        onSuggestedAction={handleSuggestedAction}
        onSerialNumberSubmit={handleSerialNumberSubmit}
      />
    );
  }

  if (chatState === 'modal') {
    return (
      <ModalChat
        conversationHistory={conversationHistory}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onModalToSidebar={handleModalToSidebar}
        isInFlow={isInFlow}
        currentStep={displayStep}
        onFlowChoice={customStep ? handleSuggestedAction : handleFlowChoice}
        isTyping={isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  if (chatState === 'sidebar') {
    return (
      <SidebarChat
        conversationHistory={conversationHistory}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        onClose={handleClose}
        onMinimize={handleMinimize}
        isInFlow={isInFlow}
        currentStep={displayStep}
        onFlowChoice={customStep ? handleSuggestedAction : handleFlowChoice}
        isTyping={isTyping}
        isInputDisabled={isInputDisabled}
        onDownloadTranscript={downloadTranscript}
        onClearHistory={clearChatHistory}
      />
    );
  }

  return null;
};

export default ChatWidget;
