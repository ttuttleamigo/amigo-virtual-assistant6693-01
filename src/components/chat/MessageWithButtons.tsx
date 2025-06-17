
import React, { useState, useEffect } from 'react';
import ConversationLayout from '@/components/visual/ConversationLayout';
import { ButtonConfig, buttonTemplates } from '@/config/buttonConfig';
import { visualConfig } from '@/config/visualConfig';

interface ButtonOption {
  text: string;
  nextStep: string;
}

interface MessageWithButtonsProps {
  message: string;
  options?: ButtonOption[];
  onButtonClick?: (option: ButtonOption, index: number) => void;
  messageDelay?: number;
  buttonDelay?: number;
  isModal?: boolean;
}

const MessageWithButtons = ({ 
  message, 
  options = [], 
  onButtonClick,
  messageDelay = 0,
  buttonDelay = visualConfig.timing.buttonDelay,
  isModal = false 
}: MessageWithButtonsProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, messageDelay);

    return () => clearTimeout(timer);
  }, [messageDelay]);

  useEffect(() => {
    if (showMessage && options.length > 0) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, buttonDelay);

      return () => clearTimeout(timer);
    }
  }, [showMessage, options.length, buttonDelay]);

  const convertToButtonConfig = (options: ButtonOption[]): ButtonConfig[] => {
    return options.map((option, index) => ({
      id: `option_${index}`,
      text: option.text,
      action: option.text
    }));
  };

  const handleButtonClick = (button: ButtonConfig) => {
    if (onButtonClick) {
      const originalOption = options.find(opt => opt.text === button.text);
      if (originalOption) {
        const index = options.indexOf(originalOption);
        onButtonClick(originalOption, index);
      }
    }
  };

  if (!showMessage) return null;

  return (
    <ConversationLayout
      message={message}
      buttons={showButtons ? convertToButtonConfig(options) : []}
      onButtonClick={handleButtonClick}
      isModal={isModal}
      showButtons={showButtons}
    />
  );
};

export default MessageWithButtons;
