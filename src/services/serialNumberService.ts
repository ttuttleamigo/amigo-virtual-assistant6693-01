
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
    
    // Replace with your actual API endpoint
    const response = await axios.get(`https://4086366.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6223&deploy=1&compid=4086366&ns-at=AAEJ7tMQZmDLpO0msvndzhyIbhPPdD7U3fcHROrep1qJ6u8nu-w&snar=${formattedSerial}`);
    
    if (response.data) {
      return response.data as ProductInfo;
    }
    
    return null;
  } catch (error) {
    console.error('Error looking up serial number:', error);
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
