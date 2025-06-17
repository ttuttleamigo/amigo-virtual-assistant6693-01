
export const botMessages = {
  // Serial number collection messages
  serialNumberHelp: "Please enter your cart's serial number below. You can find it on a label, usually on the back or bottom of your cart.\n\n**Where to look:**\n• Back of the cart (white or silver label)\n• Bottom/underside of the frame\n• Near the battery compartment\n• On the controller\n\n**What to look for:**\n• Label with \"S/N\" or \"Serial Number\"\n• Usually starts with \"AMI\" + numbers\n• Typically 8-12 characters long",

  serialNumberDetailedHelp: "I can help you find your serial number! Here's where to look:\n\n**Most Common Locations:**\n• **Back of the cart** - Look for a white or silver label\n• **Bottom/underside** - May be on the base or frame\n• **Near the battery compartment** - Sometimes inside or nearby\n• **On the controller** - Some models have it there\n\n**What to look for:**\n• A label with \"S/N\" or \"Serial Number\"\n• Usually starts with letters like \"AMI\" followed by numbers\n• Typically 8-12 characters long\n\nOnce you find it, just type it here and I'll look up your cart information!",

  serialNumberExtendedHelp: "I can help you find your serial number! Here's where to look:\n\n**Most Common Locations:**\n• **Back of the cart** - Look for a white or silver label\n• **Bottom/underside** - May be on the base or frame\n• **Near the battery compartment** - Sometimes inside or nearby\n• **On the controller** - Some models have it there\n\n**What to look for:**\n• A label with \"S/N\" or \"Serial Number\"\n• Usually starts with letters like \"AMI\" followed by numbers\n• Typically 8-12 characters long\n\n**Still can't find it?**\n• Check your purchase receipt or documentation\n• Look for any stickers or labels with numbers and letters\n• Try different angles and lighting\n\nOnce you find it, please enter it below and I'll look up your cart information!",

  // Model identification messages
  modelNameHelp: "I can help you identify your Amigo model! Here are our main models:\n\n**SmartShopper** - Compact shopping cart, great for stores\n**ValueShopper** - Affordable option with essential features\n**Vista** - Mid-range model with enhanced comfort\n**Max CR** - Heavy-duty model for outdoor use\n\n**Where to find your model:**\n• Look for a label on your cart (same place as serial number)\n• Check your paperwork or receipt\n• The model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!",

  modelIdentificationHelp: "I can help you identify your Amigo model! Here are our main models:\n\nSmartShopper - Compact shopping cart, great for stores\nValueShopper - Affordable option with essential features\nVista - Mid-range model with enhanced comfort\nMax CR - Heavy-duty model for outdoor use\n\nWhere to find your model:\nLook for a label on your cart (same place as serial number)\nCheck your paperwork or receipt\nThe model name is usually clearly marked\n\nJust tell me which model you have, or describe your cart and I can help identify it!",

  // Initial prompts and responses
  initialTroubleshootingPrompt: "I can help you troubleshoot your Amigo cart. To provide the most accurate assistance, I can work with either:\n\nSerial number - for precise troubleshooting\nModel name - for general guidance\n\nWhich would you prefer to provide? Or if you need help finding either, just let me know!",

  initialOptionsPrompt: "For the most accurate troubleshooting steps, I'll need some information about your cart.\n\nYou can provide either:\n• Serial number (found on a label, usually on the back or bottom of your cart)\n• Model name (like SmartShopper, ValueShopper, Vista, or Max CR)\n\nIf you're not sure where to find either, just let me know and I can help guide you!",

  imNotSureResponse: "No problem! I can help you find either your serial number or model name.",

  // Processing and lookup messages
  lookingUpProduct: "Looking up your product information...",

  // Success messages
  productFoundTemplate: "Found your {model}!",
  productFoundWithDateTemplate: "Found your {model}! (Purchased: {purchaseDate})",
  modelStartTroubleshooting: "Great! I can help you with your {model}. Let me start the troubleshooting process for you.",

  // Error and fallback messages
  serialNotFound: "I couldn't find that serial number in our system. Let me help you with some alternatives:\n\nTry again - Double-check the serial number (it's usually on a label on the back or bottom of your cart)\nEnter your model - If you know your cart model (like SmartShopper, ValueShopper, Vista, or Max CR), I can help based on that\nGet help locating - I can guide you on where to find your serial number\nContact support - Call 1-800-692-6446 for direct assistance\n\nWhat would you prefer to do?",

  lookupError: "I'm having trouble looking up that serial number right now. Let me offer some alternatives:\n\nTry again - This might be a temporary connection issue\nEnter your model - If you know your cart model, I can help based on that\nFind your serial number - I can help you locate it on your cart\nContact support - Call 1-800-692-6446 for immediate assistance\n\nWhat would you like to do?",

  unrecognizedInput: "I didn't recognize that as a serial number or model name. \n\nFor serial numbers: Look for 6+ characters with letters and numbers (often starting with AMI)\nFor models: Try SmartShopper, ValueShopper, Vista, or Max CR\n\nNeed help finding either? Just ask \"help find serial number\" or \"help identify model\" and I'll guide you!",

  // Suggested action responses
  repairHelpResponse: "I can help you troubleshoot your Amigo cart. To provide the most accurate assistance, I can work with either:\n\nSerial number - for precise troubleshooting\nModel name - for general guidance\n\nWhich would you prefer to provide? Or if you need help finding either, just let me know!"
};
