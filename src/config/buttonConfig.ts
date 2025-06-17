
export interface ButtonConfig {
  id: string;
  text: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'help';
  shortText?: string; // For mobile/compact views
}

export const buttonTemplates = {
  // Common action buttons
  serialNumber: {
    id: 'serial_number',
    text: 'Serial number',
    action: 'Serial number'
  },
  modelName: {
    id: 'model_name', 
    text: 'Model name',
    action: 'Model name'
  },
  notSure: {
    id: 'not_sure',
    text: "I'm not sure",
    action: "I'm not sure"
  },
  cantFind: {
    id: 'cant_find',
    text: "I can't find it",
    action: "I can't find it",
    variant: 'help' as const
  },
  
  // Flow navigation
  yes: { id: 'yes', text: 'Yes', action: 'Yes' },
  no: { id: 'no', text: 'No', action: 'No' },
  continue: { id: 'continue', text: 'Continue', action: 'Continue' },
  
  // Contact options
  phoneCall: { id: 'phone_call', text: 'Phone call', action: 'Phone call' },
  email: { id: 'email', text: 'Email', action: 'Email' },
  pleaseCallMe: { id: 'call_me', text: 'Please call me', action: 'Please call me' },
  iWillCall: { id: 'i_will_call', text: 'I will call', action: 'I will call' }
};
