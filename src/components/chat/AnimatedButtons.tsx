
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ButtonOption {
  text: string;
  nextStep: string;
}

interface AnimatedButtonsProps {
  options: ButtonOption[];
  onButtonClick: (option: ButtonOption, index: number) => void;
  showDelay?: number;
  fadeInDuration?: number;
  disabled?: boolean;
}

const AnimatedButtons = ({ 
  options, 
  onButtonClick, 
  showDelay = 0,
  fadeInDuration = 300,
  disabled = false 
}: AnimatedButtonsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (options.length > 0 && !hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, showDelay);

      return () => clearTimeout(timer);
    }
  }, [options, showDelay, hasShown]);

  useEffect(() => {
    if (options.length === 0) {
      setIsVisible(false);
      setHasShown(false);
    }
  }, [options]);

  const handleButtonClick = (option: ButtonOption, index: number) => {
    setIsVisible(false);
    onButtonClick(option, index);
  };

  if (options.length === 0) return null;

  return (
    <div 
      className={`space-y-3 transition-all duration-${fadeInDuration} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleButtonClick(option, index)}
          disabled={disabled || !isVisible}
          className="w-full justify-start text-left h-auto p-4 bg-blue-600 hover:bg-blue-700 text-white border-0 whitespace-normal break-words shadow-md rounded-xl font-medium text-sm leading-tight max-w-full"
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          <span className="block">{option.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default AnimatedButtons;
