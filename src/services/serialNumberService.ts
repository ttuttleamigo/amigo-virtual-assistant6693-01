
import { FlowType } from '@/hooks/useConversationFlow';

export interface ProductInfo {
  model: string;
  serialNumber: string;
}

export const lookupSerialNumber = async (serialNumber: string): Promise<ProductInfo | null> => {
  try {
    const response = await fetch('https://myamigo.app.n8n.cloud/webhook/daefc2e6-861b-453f-887e-4bab2478090d/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serialNumber: serialNumber
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        model: data.model,
        serialNumber: serialNumber
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
