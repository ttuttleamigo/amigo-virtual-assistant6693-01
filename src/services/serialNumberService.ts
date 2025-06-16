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
    
    // NetSuite endpoint URL
    const netsuiteUrl = `https://4086366.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=6223&deploy=1&compid=4086366&ns-at=AAEJ7tMQZmDLpO0msvndzhyIbhPPdD7U3fcHROrep1qJ6u8nu-w&snar=${formattedSerialNumber}`;
    
    // Try multiple CORS proxy services for better reliability
    const proxies = [
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(netsuiteUrl)}`,
      `https://cors-anywhere.herokuapp.com/${netsuiteUrl}`,
      `https://thingproxy.freeboard.io/fetch/${netsuiteUrl}`
    ];
    
    let lastError;
    
    for (const proxyUrl of proxies) {
      try {
        console.log(`Attempting request with proxy: ${proxyUrl}`);
        
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (response.ok) {
          let data;
          
          // Handle different proxy response formats
          if (proxyUrl.includes('codetabs.com')) {
            data = await response.json();
          } else {
            const responseText = await response.text();
            data = JSON.parse(responseText);
          }
          
          console.log('Successfully retrieved data:', data);
          
          // Extract the required fields from the response
          return {
            model: data.model || '',
            serialNumber: data.name || formattedSerialNumber,
            purchaseDate: data.purchdate || '',
            itemNumber: data.itemnumber || '',
            itemDescription: data.itemdescription || ''
          };
        }
        
        console.log(`Proxy ${proxyUrl} returned status: ${response.status}`);
      } catch (proxyError) {
        console.log(`Proxy ${proxyUrl} failed:`, proxyError);
        lastError = proxyError;
        continue;
      }
    }
    
    // If all proxies failed, throw the last error
    throw lastError || new Error('All CORS proxies failed');
    
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
