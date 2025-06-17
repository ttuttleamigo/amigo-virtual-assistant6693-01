
import { ButtonConfig } from '@/config/buttonConfig';
import { visualConfig } from '@/config/visualConfig';

export const convertToButtonConfig = (options: any[]): ButtonConfig[] => {
  return options.map((option, index) => ({
    id: `option_${index}`,
    text: option.text.length > visualConfig.buttons.maxTextLength 
      ? option.text.substring(0, visualConfig.buttons.maxTextLength) + '...'
      : option.text,
    action: option.text,
    variant: option.text.toLowerCase().includes("can't find") || option.text.toLowerCase().includes("help") ? 'help' : 'primary'
  }));
};
