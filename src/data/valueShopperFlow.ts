

export const valueShopperFlow = {
  greeting: {
    botMessage: "What seems to be the issue you're experiencing?",
    userOptions: [
      { text: "My ValueShopper turns on, but the charger will not turn on or the batteries do not hold a charge", nextStep: "chargerIssue" },
      { text: "My ValueShopper will not move", nextStep: "movementIssue" },
      { text: "I have a different customer service need", nextStep: "contactAgent" }
    ]
  },
  chargerIssue: {
    botMessage: "Let's troubleshoot your charging issue. First, let's check the basics:\n\n1. Make sure the charger is plugged into a working wall outlet\n2. Ensure the charger cord is fully inserted into the charging port on your ValueShopper\n3. Check that the charger indicator light is on\n\nIs the charger indicator light on?",
    userOptions: [
      { text: "Yes, the charger light is on", nextStep: "chargerLightOn" },
      { text: "No, the charger light is not on", nextStep: "chargerLightOff" }
    ]
  },
  chargerLightOn: {
    botMessage: "Good! Since the charger light is on, let's check the battery connections:\n\n1. Make sure your ValueShopper is turned OFF\n2. Locate the battery compartment (usually under the seat)\n3. Check that all battery connections are tight and secure\n4. Look for any signs of corrosion on the battery terminals\n\nAre the battery connections secure and free of corrosion?",
    userOptions: [
      { text: "Yes, connections look good", nextStep: "batteryTest" },
      { text: "No, I see loose connections or corrosion", nextStep: "batteryMaintenance" }
    ]
  },
  chargerLightOff: {
    botMessage: "If the charger light is not on, let's check a few things:\n\n1. Try a different wall outlet\n2. Check if the charger cord is damaged\n3. Make sure the charger plug is fully inserted into the charging port\n\nAfter checking these items, is the charger light now on?",
    userOptions: [
      { text: "Yes, the charger light is now on", nextStep: "chargerLightOn" },
      { text: "No, the charger light is still off", nextStep: "chargerReplacement" }
    ]
  },
  batteryTest: {
    botMessage: "Let's test the battery performance:\n\n1. Fully charge your ValueShopper (leave it plugged in overnight)\n2. Unplug the charger\n3. Turn on your ValueShopper and check the battery indicator\n4. Try using it for a short distance\n\nHow does the battery perform after a full charge?",
    userOptions: [
      { text: "Battery works well after charging", nextStep: "resolved" },
      { text: "Battery drains quickly or won't hold charge", nextStep: "batteryReplacement" }
    ]
  },
  batteryMaintenance: {
    botMessage: "Battery maintenance is important for proper operation:\n\n1. Turn OFF your ValueShopper and unplug the charger\n2. Clean any corrosion from battery terminals with a wire brush\n3. Ensure all connections are tight\n4. If connections are damaged, they may need replacement\n\nAfter cleaning and tightening connections, try charging again. Is the issue resolved?",
    userOptions: [
      { text: "Yes, it's working now", nextStep: "resolved" },
      { text: "No, still having issues", nextStep: "batteryReplacement" }
    ]
  },
  chargerReplacement: {
    botMessage: "It appears your charger may need replacement. Here's what to do:\n\n• Contact our parts department at 1-800-692-6446\n• Have your ValueShopper model and serial number ready\n• They can help you order the correct replacement charger\n\nWould you like additional assistance or have other questions?",
    userOptions: [
      { text: "No, that's all I need", nextStep: "endConversation" },
      { text: "Yes, I have another question", nextStep: "contactAgent" },
      { text: "Help me find my serial number", nextStep: "serialNumberHelp" }
    ]
  },
  batteryReplacement: {
    botMessage: "Your batteries may need replacement. ValueShopper batteries typically last 1-2 years depending on usage:\n\n• Contact our parts department at 1-800-692-6446\n• Have your ValueShopper model and serial number ready\n• They can help you order the correct replacement batteries\n\nWould you like additional assistance or have other questions?",
    userOptions: [
      { text: "No, that's all I need", nextStep: "endConversation" },
      { text: "Yes, I have another question", nextStep: "contactAgent" },
      { text: "Help me find my serial number", nextStep: "serialNumberHelp" }
    ]
  },
  serialNumberHelp: {
    botMessage: "I can help you find your serial number! Here's where to look:\n\nMost Common Locations:\n• Back of the cart - Look for a white or silver label\n• Bottom/underside - May be on the base or frame\n• Near the battery compartment - Sometimes inside or nearby\n• On the controller - Some models have it there\n\nWhat to look for:\n• A label with \"S/N\" or \"Serial Number\"\n• Usually starts with letters like \"AMI\" followed by numbers\n• Typically 8-12 characters long\n\nDid this help you locate your serial number?",
    userOptions: [
      { text: "Yes, I found it", nextStep: "endConversation" },
      { text: "No, I still can't find it", nextStep: "contactAgent" },
      { text: "I have another question", nextStep: "contactAgent" }
    ]
  },
  movementIssue: {
    botMessage: "Let's troubleshoot why your ValueShopper won't move:\n\n1. Check that your ValueShopper is turned ON\n2. Ensure the battery is charged (check the battery indicator)\n3. Make sure you're not in freewheel mode\n4. Check that the speed control is set above the minimum\n\nAfter checking these items, does your ValueShopper move?",
    userOptions: [
      { text: "Yes, it's moving now", nextStep: "resolved" },
      { text: "No, it still won't move", nextStep: "movementTroubleshooting" }
    ]
  },
  movementTroubleshooting: {
    botMessage: "Let's try a few more troubleshooting steps:\n\n1. Check if the seat is properly positioned and locked\n2. Ensure the joystick is centered and not stuck\n3. Look for any error codes on the display\n4. Try turning the unit OFF and ON again\n\nAre you seeing any error codes or unusual behavior?",
    userOptions: [
      { text: "No error codes, but still won't move", nextStep: "technicalSupport" },
      { text: "I see error codes on the display", nextStep: "errorCodes" }
    ]
  },
  errorCodes: {
    botMessage: "Error codes can help diagnose the issue. Common ValueShopper error codes include:\n\n• Code 1: Battery low\n• Code 2: Motor issue\n• Code 3: Controller problem\n\nFor specific error code diagnosis and repair, please contact our technical support team at 1-800-692-6446. They can provide detailed troubleshooting based on your specific error code.\n\nIs there anything else I can help you with?",
    userOptions: [
      { text: "No, I'll call technical support", nextStep: "endConversation" },
      { text: "Yes, I have another question", nextStep: "contactAgent" }
    ]
  },
  technicalSupport: {
    botMessage: "For advanced troubleshooting of movement issues, I recommend contacting our technical support team:\n\n• Call 1-800-692-6446\n• Have your ValueShopper model and serial number ready\n• They can walk you through advanced diagnostics\n\nIs there anything else I can help you with today?",
    userOptions: [
      { text: "No, that's all I need", nextStep: "endConversation" },
      { text: "Yes, I have another question", nextStep: "contactAgent" }
    ]
  },
  resolved: {
    botMessage: "Great! I'm glad we could resolve the issue. For future reference:\n\n• Charge your ValueShopper regularly\n• Keep battery terminals clean\n• Store in a dry location\n\nIs there anything else I can help you with today?",
    userOptions: [
      { text: "No, that's all I need", nextStep: "endConversation" },
      { text: "Yes, I have another question", nextStep: "contactAgent" }
    ]
  }
};

