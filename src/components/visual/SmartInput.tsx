
import React from 'react';
import { Input } from '@/components/ui/input';
import { visualConfig } from '@/config/visualConfig';

interface SmartInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  mode?: 'default' | 'serial' | 'model' | 'disabled';
  isTyping?: boolean;
  customPlaceholder?: string;
  className?: string;
}

const SmartInput = ({ 
  value, 
  onChange, 
  onSubmit,
  mode = 'default',
  isTyping = false,
  customPlaceholder,
  className = ''
}: SmartInputProps) => {
  const getPlaceholder = () => {
    if (customPlaceholder) return customPlaceholder;
    if (isTyping) return visualConfig.input.processingPlaceholder;
    
    switch (mode) {
      case 'serial':
        return visualConfig.input.serialPlaceholder;
      case 'disabled':
        return visualConfig.input.disabledPlaceholder;
      default:
        return visualConfig.input.defaultPlaceholder;
    }
  };

  const isDisabled = mode === 'disabled' || isTyping;

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={getPlaceholder()}
      disabled={isDisabled}
      onKeyPress={(e) => e.key === 'Enter' && !isDisabled && onSubmit?.()}
      className={className}
    />
  );
};

export default SmartInput;
