
export const smartShopperFlow = {
  greeting: {
    id: 'greeting',
    botMessage: "Hello! I'm Amigo Mobility's virtual assistant, and I'm here to help you troubleshoot your SmartShopper. What seems to be the issue you're experiencing?",
    userOptions: [
      {
        text: "My SmartShopper turns on, but the charger will not turn on or the batteries do not hold a charge",
        nextStep: "step_for_ss_battery_troubleshooting"
      },
      {
        text: "My SmartShopper will not move",
        nextStep: "step_for_ss_wont_move"
      }
    ]
  },

  step_for_ss_battery_troubleshooting: {
    id: 'step_for_ss_battery_troubleshooting',
    botMessage: "Let's start by checking your charger connection. Please plug the AC cord into the wall outlet and let me know what you see.",
    userOptions: [
      { text: "Okay, I've plugged it in. What should I look for?", nextStep: "check_charging_indicators" }
    ]
  },

  check_charging_indicators: {
    id: 'check_charging_indicators',
    botMessage: "Great! Now let's check if your SmartShopper is showing that it's charging. If you have an LED battery gauge on your throttle, does it flash for 10-30 seconds before going solid? Or if you have an LCD display, does it show a green rectangle at the bottom with 'CHARGING' text?",
    userOptions: [
      { text: "Yes, I see the charging indicator", nextStep: "measure_record_voltage" },
      { text: "No, I don't see any charging indicator", nextStep: "ac_cord_illuminate" }
    ]
  },

  ac_cord_illuminate: {
    id: 'ac_cord_illuminate',
    botMessage: "Let's check if your AC cord is getting power. Look at the end of the AC cord that plugs into the wall - does it have a small light that's illuminated?",
    userOptions: [
      { text: "Yes, there's a light on the AC cord", nextStep: "charger_not_turning_on" },
      { text: "No, there's no light on the AC cord", nextStep: "wall_outlet_replace_cord" }
    ]
  },

  wall_outlet_replace_cord: {
    id: 'wall_outlet_replace_cord',
    botMessage: "Let's make sure your wall outlet is working by testing it with another device. If the outlet works fine, then your AC cord needs to be replaced. Do you need help ordering a replacement AC cord?",
    userOptions: [
      { text: "Yes, I need to order a new AC cord", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  charger_not_turning_on: {
    id: 'charger_not_turning_on',
    botMessage: "Since your AC cord is getting power but the charger isn't turning on, let's check the connection port. Can you check if there's continuity in the 11024-IEC Receptacle?",
    userOptions: [
      { text: "Yes, there is continuity", nextStep: "measure_voltage" },
      { text: "No, there's no continuity", nextStep: "replace_receptacle" }
    ]
  },

  replace_receptacle: {
    id: 'replace_receptacle',
    botMessage: "You'll need to replace the 11024-Receptacle. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the receptacle", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  measure_voltage: {
    id: 'measure_voltage',
    botMessage: "Now let's check your battery voltage. If you have AGM batteries, measure both batteries together - they need at least 16 volts combined. If you have a single lithium battery, it needs at least 21 volts. What's your voltage reading?",
    userOptions: [
      { text: "The batteries are under the minimum voltage", nextStep: "replace_batteries" },
      { text: "The batteries meet the minimum voltage requirement", nextStep: "check_circuit_breaker" }
    ]
  },

  replace_batteries: {
    id: 'replace_batteries',
    botMessage: "Your batteries need to be replaced since they're not holding enough voltage. Would you like help ordering replacement batteries?",
    userOptions: [
      { text: "Yes, I need to order new batteries", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  check_circuit_breaker: {
    id: 'check_circuit_breaker',
    botMessage: "Let's check your circuit breaker. Can you test the continuity of the circuit breaker to see if it's working properly?",
    userOptions: [
      { text: "No, the circuit breaker has no continuity", nextStep: "replace_breaker" },
      { text: "Yes, the circuit breaker has continuity", nextStep: "check_dc_wiring" }
    ]
  },

  replace_breaker: {
    id: 'replace_breaker',
    botMessage: "You'll need to replace the 12038-Circuit Breaker. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the circuit breaker", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  check_dc_wiring: {
    id: 'check_dc_wiring',
    botMessage: "Let's check your wiring connections. Please make sure all the DC wiring connections from the charger to the controller are tight and secure. How do the connections look?",
    userOptions: [
      { text: "The DC wiring harness looks damaged or loose", nextStep: "replace_harness_or_charger" },
      { text: "The DC wiring connections look good", nextStep: "replace_battery_charger" }
    ]
  },

  replace_harness_or_charger: {
    id: 'replace_harness_or_charger',
    botMessage: "You'll need to replace the DC cable harness. If your charger has a removable DC cable, you can order the 7852.10-DC Cable Harness. If it's hard-wired, you'll need a new battery charger. Would you like help ordering the right part?",
    userOptions: [
      { text: "Yes, I need help ordering the right part", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  replace_battery_charger: {
    id: 'replace_battery_charger',
    botMessage: "Based on our troubleshooting, your battery charger needs to be replaced. Would you like help ordering a replacement charger?",
    userOptions: [
      { text: "Yes, I need to order a new charger", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  measure_record_voltage: {
    id: 'measure_record_voltage',
    botMessage: "Perfect! Now let's test your battery voltage. First, unplug the AC cord from the wall and measure the voltage on your batteries. Then plug it back in, wait 2 minutes, and measure again. Has the voltage increased to at least 25 volts?",
    userOptions: [
      { text: "Yes, the voltage increased to 25 volts or more", nextStep: "replace_batteries_charger_good" },
      { text: "No, the voltage didn't reach 25 volts", nextStep: "replace_battery_charger" }
    ]
  },

  replace_batteries_charger_good: {
    id: 'replace_batteries_charger_good',
    botMessage: "Your charger is working properly, but your batteries have reached the end of their life and can no longer hold a proper charge. They'll need to be replaced. Would you like help ordering new batteries?",
    userOptions: [
      { text: "Yes, I need to order new batteries", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  step_for_ss_wont_move: {
    id: 'step_for_ss_wont_move',
    botMessage: "Let's start by checking if your SmartShopper is getting power. When you turn it on, does the battery display or diagnostic window on the throttle light up?",
    userOptions: [
      { text: "Yes, the display lights up", nextStep: "numeral_diagnostic_window" },
      { text: "No, nothing lights up", nextStep: "remove_seat_test_voltage" }
    ]
  },

  numeral_diagnostic_window: {
    id: 'numeral_diagnostic_window',
    botMessage: "Great! Now let's check for any error codes. Do you see any numbers displayed in the diagnostic window?",
    userOptions: [
      { text: "Yes, I see a number in the diagnostic window", nextStep: "diagnostic_issue" },
      { text: "No, I don't see any numbers", nextStep: "sit_on_ss_try_again" }
    ]
  },

  sit_on_ss_try_again: {
    id: 'sit_on_ss_try_again',
    botMessage: "Your SmartShopper has a safety feature that requires someone to be sitting in the seat. Please sit in the seat and make sure you're pressing down on the safety switch. Does your SmartShopper move now?",
    userOptions: [
      { text: "Yes, it moves now!", nextStep: "problem_resolved" },
      { text: "No, it still won't move", nextStep: "disconnect_seat_switch" }
    ]
  },

  problem_resolved: {
    id: 'problem_resolved',
    botMessage: "Wonderful! Your SmartShopper is working properly now. The issue was simply the seat safety switch needing to be activated. If you have any other questions, feel free to ask!",
    userOptions: []
  },

  disconnect_seat_switch: {
    id: 'disconnect_seat_switch',
    botMessage: "Let's test if the seat switch is working properly. Carefully disconnect the seat switch wires and create a temporary jumper connection across the two wires. Does your SmartShopper move now when you operate the throttle?",
    userOptions: [
      { text: "Yes, it moves with the jumper connection", nextStep: "replace_seat_switch" },
      { text: "No, it still doesn't move", nextStep: "replace_wire_harness" }
    ]
  },

  replace_seat_switch: {
    id: 'replace_seat_switch',
    botMessage: "Perfect! That confirms your seat switch needs to be replaced. Would you like help ordering a new seat switch?",
    userOptions: [
      { text: "Yes, I need to order a seat switch", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  replace_wire_harness: {
    id: 'replace_wire_harness',
    botMessage: "The issue is with your wire harness. You'll need to replace the 10947-18 Pin Wire Harness. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the wire harness", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  remove_seat_test_voltage: {
    id: 'remove_seat_test_voltage',
    botMessage: "Since there's no power to the display, let's check your battery. You'll need to remove the seat assembly and rear cover to access the controller. Can you test the battery voltage at the controller? It should be greater than 21 volts.",
    userOptions: [
      { text: "Yes, the battery voltage is above 21 volts", nextStep: "check_wiring" },
      { text: "No, the battery voltage is 21 volts or less", nextStep: "recharge_batteries" }
    ]
  },

  recharge_batteries: {
    id: 'recharge_batteries',
    botMessage: "Your battery needs to be recharged or replaced. Try recharging your battery completely first. If it still doesn't hold a charge above 21 volts, you'll need new batteries. Would you like help ordering replacement batteries?",
    userOptions: [
      { text: "Yes, I need to order new batteries", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  check_wiring: {
    id: 'check_wiring',
    botMessage: "Let's check all your wiring connections. Make sure all wires from the handle and controller are securely connected, then measure the battery voltage at the controller. Does it match the voltage you measured at the battery itself?",
    userOptions: [
      { text: "Yes, the voltages match and connections are secure", nextStep: "substitute_parts" },
      { text: "No, the voltages don't match or connections are loose", nextStep: "check_circuit_breaker_voltage" }
    ]
  },

  substitute_parts: {
    id: 'substitute_parts',
    botMessage: "We'll need to test some components to find the faulty part. Try substituting these parts one at a time until you find the problem: 1) Handle cable, 2) Throttle assembly, 3) Controller. Would you like help ordering these parts for testing?",
    userOptions: [
      { text: "Yes, I need help ordering parts for testing", nextStep: "order_parts" },
      { text: "No, I'll handle the testing myself", nextStep: "end_conversation" }
    ]
  },

  check_circuit_breaker_voltage: {
    id: 'check_circuit_breaker_voltage',
    botMessage: "Let's check your circuit breaker. Can you test for continuity through the 12038-Circuit Breaker?",
    userOptions: [
      { text: "Yes, there is continuity through the breaker", nextStep: "replace_battery_wire" },
      { text: "No, there is no continuity", nextStep: "replace_breaker" }
    ]
  },

  replace_battery_wire: {
    id: 'replace_battery_wire',
    botMessage: "The issue is with your battery wire connections. You'll need to replace the battery wire assemblies with a 9853-Battery Wire Disconnect kit. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the battery wire kit", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  diagnostic_issue: {
    id: 'diagnostic_issue',
    botMessage: "The number you're seeing is a diagnostic code that indicates a specific issue with your SmartShopper. Is the number showing a \"2\"? Usually, the number \"2\" displays because the brake circuit is open.",
    userOptions: [
      { text: "Yes, it's showing a \"2\"", nextStep: "freewheel_lever" },
      { text: "No, it's a different number", nextStep: "diagnostic_code_guide" }
    ]
  },

  freewheel_lever: {
    id: 'freewheel_lever',
    botMessage: "Let's check your freewheel lever position. Turn the SmartShopper off, reach through the slot in the cover next to the right rear wheel and make sure the freewheel lever is pulled all the way to the rear in the Normal position. Turn the key back on - is the \"2\" code still showing?",
    userOptions: [
      { text: "No, the code is gone now", nextStep: "problem_resolved" },
      { text: "Yes, the \"2\" code is still there", nextStep: "check_brake_wiring" }
    ]
  },

  check_brake_wiring: {
    id: 'check_brake_wiring',
    botMessage: "Let's check the brake wiring for continuity. If the wires are good, you'll need to replace the 11087-Brake. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the brake", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  diagnostic_code_guide: {
    id: 'diagnostic_code_guide',
    botMessage: "Please refer to your Amigo Diagnostic Code Guide to find the exact steps for resolving this specific code, or contact our support team for assistance with the code you're seeing.",
    userOptions: []
  },

  // Shared end states
  order_parts: {
    id: 'order_parts',
    botMessage: "I'll connect you with our parts department to help you order the required components. They'll make sure you get exactly what you need for your SmartShopper!",
    userOptions: []
  },

  end_conversation: {
    id: 'end_conversation',
    botMessage: "Thank you for using Amigo's troubleshooting assistant! If you need any further help, please don't hesitate to contact us. We're always here to help!",
    userOptions: []
  }
};
