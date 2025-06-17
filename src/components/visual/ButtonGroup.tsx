
import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonConfig } from '@/config/buttonConfig';

interface ButtonGroupProps {
  buttons: ButtonConfig[];
  onButtonClick: (button: ButtonConfig) => void;
  disabled?: boolean;
  variant?: 'flow' | 'chat';
  className?: string;
}

const ButtonGroup = ({ 
  buttons, 
  onButtonClick, 
  disabled = false,
  variant = 'flow',
  className = '' 
}: ButtonGroupProps) => {
  const getButtonStyle = (buttonVariant?: string) => {
    const baseClasses = "w-full justify-start text-left h-auto p-4 whitespace-normal break-words rounded-xl font-medium text-sm leading-tight transition-all duration-300 transform hover:scale-[1.02] shadow-lg";
    
    switch (buttonVariant) {
      case 'help':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 hover:shadow-xl hover:shadow-blue-500/30`;
      case 'secondary':
        return `${baseClasses} bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-0 hover:shadow-xl hover:shadow-blue-400/30`;
      default:
        return `${baseClasses} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 hover:shadow-xl hover:shadow-blue-600/40`;
    }
  };

  if (buttons.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {buttons.map((button) => (
        <Button
          key={button.id}
          onClick={() => onButtonClick(button)}
          disabled={disabled}
          className={getButtonStyle(button.variant)}
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          <span className="block">{button.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
