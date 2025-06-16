
import { FlowType } from '@/hooks/useConversationFlow';

export interface ProductInfo {
  model: string;
  serialNumber: string;
  purchaseDate?: string;
  itemNumber?: string;
  itemDescription?: string;
}

// Format serial number according to the requirements
const formatSerialNumber = (userInput: string): string => {
  const cleanInput = userInput.trim();
  let coreSNPart = '';
  
  // Check if userInput (case-insensitive) starts with "ami"
  if (cleanInput.toLowerCase().startsWith('ami')) {
    // Remove the "ami" prefix
    coreSNPart = cleanInput.substring(3);
  } else {
    // Use the entire input as core part
    coreSNPart = cleanInput;
  }
  
  // Final formatted serial number is "AMI" + core_sn_part
  return 'AMI' + coreSNPart;
};

export const lookupSerialNumber = async (serialNumber: string): Promise<ProductInfo | null> => {
  try {
    // Format the serial number according to requirements
    const formattedSerialNumber = formatSerialNumber(serialNumber);
    
    // Make GET request to NetSuite endpoint
    const response = await fetch(`https://4086366.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6223&deploy=1&compid=4086366&ns-at=AAEJ7tMQZmDLpO0msvndzhyIbhPPdD7U3fcHROrep1qJ6u8nu-w&snar=${formattedSerialNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      
      // Extract the required fields from the response
      return {
        model: data.model || '',
        serialNumber: data.name || formattedSerialNumber,
        purchaseDate: data.purchdate || '',
        itemNumber: data.itemnumber || '',
        itemDescription: data.itemdescription || ''
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error looking up serial number:', error);
    throw error;
  }
};

export const determineFlowFromModel = (model: string): FlowType => {
  const modelLower = model.toLowerCase();
  
  if (modelLower.includes('max cr') || modelLower.includes('maxcr')) {
    return 'maxCR';
  } else if (modelLower.includes('smartshopper') || modelLower.includes('smart shopper')) {
    return 'smartShopper';
  } else if (modelLower.includes('valueshopper') || modelLower.includes('value shopper')) {
    return 'valueShopper';
  } else if (modelLower.includes('vista')) {
    return 'vista';
  }
  
  return 'general';
};
