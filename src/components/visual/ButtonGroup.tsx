
import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonConfig } from '@/config/buttonConfig';
import { visualConfig } from '@/config/visualConfig';

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
    const baseClasses = "w-full justify-start text-left h-auto p-4 whitespace-normal break-words shadow-md rounded-xl font-medium text-sm leading-tight";
    
    switch (buttonVariant) {
      case 'help':
        return `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300`;
      case 'secondary':
        return `${baseClasses} bg-white hover:bg-gray-50 text-blue-600 border border-blue-200`;
      default:
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white border-0`;
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
