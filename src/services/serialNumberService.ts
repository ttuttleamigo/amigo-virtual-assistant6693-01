
import axios from 'axios';

export interface ProductInfo {
  name: string;
  purchdate: string;
  model: string;
  itemnumber: string;
  itemdescription: string;
}

export const formatSerialNumber = (userInput: string): string => {
  const trimmedInput = userInput.trim();
  
  // Check if input starts with "ami" (case-insensitive)
  if (trimmedInput.toLowerCase().startsWith('ami')) {
    // Remove the "ami" prefix and get the core part
    const corePart = trimmedInput.substring(3);
    return `AMI${corePart}`;
  } else {
    // Input doesn't start with "ami", so add "AMI" prefix
    return `AMI${trimmedInput}`;
  }
};

export const lookupSerialNumber = async (serialNumber: string): Promise<ProductInfo | null> => {
  try {
    const formattedSerial = formatSerialNumber(serialNumber);
    console.log('Formatted serial number:', formattedSerial);
    
    // Call the webhook with the serial number
    const response = await axios.post('https://myamigo.app.n8n.cloud/webhook/daefc2e6-861b-453f-887e-4bab2478090d/chat', {
      serialNumber: formattedSerial
    });
    
    console.log('Webhook Response status:', response.status);
    console.log('Webhook Response data:', response.data);
    console.log('Webhook Response data type:', typeof response.data);
    
    if (response.data && typeof response.data === 'object') {
      // Check if the response has the expected properties, particularly the model
      if (response.data.model) {
        console.log('Valid product data found:', response.data);
        return response.data as ProductInfo;
      } else {
        console.log('Response data does not contain model field');
        return null;
      }
    }
    
    console.log('No valid data in response');
    return null;
  } catch (error) {
    console.error('Error looking up serial number via webhook:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return null;
  }
};

export const determineFlowFromModel = (model: string): 'general' | 'smartShopper' | 'valueShopper' | 'vista' => {
  const modelLower = model.toLowerCase();
  
  if (modelLower.includes('smart shopper') || modelLower.includes('smartshopper')) {
    return 'smartShopper';
  } else if (modelLower.includes('value shopper') || modelLower.includes('valueshopper')) {
    return 'valueShopper';
  } else if (modelLower.includes('vista')) {
    return 'vista';
  }
  
  return 'general';
};
