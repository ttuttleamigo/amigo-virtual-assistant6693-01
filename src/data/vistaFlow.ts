
import { ConversationStep } from '@/data/conversationFlow';

export const vistaFlow = {
  greeting: {
    id: 'greeting',
    botMessage: "Hello! I'm Amigo Mobility's virtual assistant, and I'm here to help you troubleshoot your Vista. What seems to be the issue you're experiencing?",
    userOptions: [
      {
        text: "My Vista turns on, but the charger will not turn on or the batteries do not hold a charge",
        nextStep: "step_for_vista_battery_troubleshooting"
      },
      {
        text: "My Vista will not move",
        nextStep: "step_for_vista_wont_move"
      },
      {
        text: "I have a different customer service need",
        nextStep: "contact_agent"
      }
    ]
  },

  step_for_vista_battery_troubleshooting: {
    id: 'step_for_vista_battery_troubleshooting',
    botMessage: "Let's start by checking your charger connection. Please plug the AC cord into the wall outlet and let me know what you see.",
    userOptions: [
      { text: "Okay, I've plugged it in. What should I look for?", nextStep: "check_charging_indicators" }
    ]
  },

  check_charging_indicators: {
    id: 'check_charging_indicators',
    botMessage: "Great! Now let's check if your Vista is showing that it's charging. If you have an LED battery gauge on your throttle, does it flash for 10-30 seconds before going solid? Or if you have an LCD display, does it show a green rectangle at the bottom with 'CHARGING' text?",
    userOptions: [
      { text: "Yes, I see the charging indicator", nextStep: "charge_batteries_measure_voltage" },
      { text: "No, I don't see any charging indicator", nextStep: "ac_cord_illuminate" }
    ]
  },

  charge_batteries_measure_voltage: {
    id: 'charge_batteries_measure_voltage',
    botMessage: "Perfect! Now let's test your battery voltage. First, unplug the AC cord from the wall and measure the voltage on your batteries. Then plug it back in, wait 2 minutes, and measure again. Has the voltage increased to at least 25 volts?",
    userOptions: [
      { text: "Yes, the voltage increased to 25 volts or more", nextStep: "charger_fine_replace_batteries" },
      { text: "No, the voltage didn't reach 25 volts", nextStep: "replace_charger" }
    ]
  },

  charger_fine_replace_batteries: {
    id: 'charger_fine_replace_batteries',
    botMessage: "Your charger is working properly, but your batteries have reached the end of their life and can no longer hold a proper charge. They'll need to be replaced. Would you like help ordering new batteries?",
    userOptions: [
      { text: "Yes, I need to order new batteries", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  replace_charger: {
    id: 'replace_charger',
    botMessage: "It looks like your battery charger isn't outputting the proper voltage and needs to be replaced. Would you like help ordering a replacement charger?",
    userOptions: [
      { text: "Yes, I need to order a new charger", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  ac_cord_illuminate: {
    id: 'ac_cord_illuminate',
    botMessage: "Let's check if your AC cord is working. Look at the end of the AC cord that plugs into the wall - does it have a small light that illuminates when plugged in?",
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
    botMessage: "Since your AC cord is getting power but the charger isn't turning on, let's check the IEC receptacle connection. Can you check if there's continuity in the 11024-IEC Receptacle?",
    userOptions: [
      { text: "Yes, there is continuity", nextStep: "check_battery_voltage" },
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

  check_battery_voltage: {
    id: 'check_battery_voltage',
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
      { text: "Yes, the circuit breaker has continuity", nextStep: "check_dc_wiring" },
      { text: "No, the circuit breaker has no continuity", nextStep: "replace_breaker" }
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
      { text: "The DC wiring harness looks damaged or loose", nextStep: "replace_harness" },
      { text: "The DC wiring connections look good", nextStep: "replace_battery_charger" }
    ]
  },

  replace_harness: {
    id: 'replace_harness',
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

  step_for_vista_wont_move: {
    id: 'step_for_vista_wont_move',
    botMessage: "Let's start by checking if your Vista is getting power. When you turn it on, does the battery display or diagnostic window on the throttle light up?",
    userOptions: [
      { text: "Yes, the display lights up", nextStep: "battery_display_flashing" },
      { text: "No, nothing lights up", nextStep: "test_battery_voltage" }
    ]
  },

  battery_display_flashing: {
    id: 'battery_display_flashing',
    botMessage: "Great! Now let's check if there are any error codes. Is the battery display flashing?",
    userOptions: [
      { text: "Yes, the display is flashing", nextStep: "numeral_2_illuminate" },
      { text: "No, the display is steady", nextStep: "make_sure_sitting_try_again" }
    ]
  },

  numeral_2_illuminate: {
    id: 'numeral_2_illuminate',
    botMessage: "Let's check what error code is showing. Is the numeral \"2\" illuminated in the diagnostic window?",
    userOptions: [
      { text: "Yes, it's showing a \"2\"", nextStep: "brake_circuit_open" },
      { text: "No, it's a different number", nextStep: "diagnostic_code_guide" }
    ]
  },

  diagnostic_code_guide: {
    id: 'diagnostic_code_guide',
    botMessage: "The number you're seeing is a diagnostic code that indicates a specific issue. Please refer to your Amigo Diagnostic Code Guide for the exact troubleshooting steps for that code, or contact our support team for assistance.",
    userOptions: []
  },

  brake_circuit_open: {
    id: 'brake_circuit_open',
    botMessage: "The \"2\" code indicates the brake circuit is open. Let's check your freewheel lever position. Turn the key off, reach through the slot in the cover next to the right rear wheel, and make sure the freewheel lever is pulled all the way to the rear in the Normal position. Turn the key back on - is the \"2\" code still showing?",
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

  make_sure_sitting_try_again: {
    id: 'make_sure_sitting_try_again',
    botMessage: "Your Vista has a safety feature that requires someone to be sitting in the seat. Please sit in the seat and make sure you're pressing down on the seat switch under the seat cover. Does your Vista move now?",
    userOptions: [
      { text: "Yes, it moves now!", nextStep: "problem_resolved" },
      { text: "No, it still won't move", nextStep: "throttle_lever_activated" }
    ]
  },

  problem_resolved: {
    id: 'problem_resolved',
    botMessage: "Wonderful! Your Vista is working properly now. The issue was simply the safety switch needing to be activated. If you have any other questions, feel free to ask!",
    userOptions: []
  },

  throttle_lever_activated: {
    id: 'throttle_lever_activated',
    botMessage: "Let's test if the seat switch is working properly. Carefully disconnect the two wires from the seat switch terminals coming off the 10947-Wire assembly and create a temporary jumper connection across the two wires. Does your Vista move now when you operate the throttle?",
    userOptions: [
      { text: "Yes, it moves with the jumper connection", nextStep: "replace_wire_assembly" },
      { text: "No, it still doesn't move", nextStep: "swap_parts" }
    ]
  },

  replace_wire_assembly: {
    id: 'replace_wire_assembly',
    botMessage: "Perfect! That confirms your seat switch needs to be replaced. You'll need to replace the 10947-Wire Assembly. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the wire assembly", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  swap_parts: {
    id: 'swap_parts',
    botMessage: "We'll need to test some components to find the faulty part. Try substituting these parts one at a time: 1) Replace the 8969-Handle Cable, 2) Replace the throttle enclosure, 3) Replace the motor controller, 4) If none work, replace the 11042-Drive. Would you like help ordering these parts for testing?",
    userOptions: [
      { text: "Yes, I need help ordering parts for testing", nextStep: "order_parts" },
      { text: "No, I'll handle the testing myself", nextStep: "end_conversation" }
    ]
  },

  test_battery_voltage: {
    id: 'test_battery_voltage',
    botMessage: "Since there's no power to the display, let's check your battery. You'll need to remove the 7/16\" bolt underneath the front of the seat that runs between the seat release levers to access the controller. Can you test the battery voltage at the controller? It should be greater than 21 volts.",
    userOptions: [
      { text: "Yes, the battery voltage is above 21 volts", nextStep: "check_wiring" },
      { text: "No, the battery voltage is 21 volts or less", nextStep: "recharge_batteries_replace_batteries" }
    ]
  },

  recharge_batteries_replace_batteries: {
    id: 'recharge_batteries_replace_batteries',
    botMessage: "Your battery needs to be recharged or replaced. Try recharging your battery completely first. If it still doesn't hold a charge above 21 volts, you'll need new batteries. Would you like help ordering replacement batteries?",
    userOptions: [
      { text: "Yes, I need to order new batteries", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  check_wiring: {
    id: 'check_wiring',
    botMessage: "Let's check all your wiring connections. Make sure all wires from the handle enclosure, breakout board, and controller are securely connected, then measure the battery voltage at the controller. Does it match the voltage you measured at the battery itself?",
    userOptions: [
      { text: "Yes, the voltages match and connections are secure", nextStep: "substitute_parts" },
      { text: "No, the voltages don't match or connections are loose", nextStep: "check_continuity" }
    ]
  },

  substitute_parts: {
    id: 'substitute_parts',
    botMessage: "We'll need to test some components to find the faulty part. Try substituting these parts one at a time: 1) 8969-Handle cable, 2) Throttle enclosure, 3) Controller. Would you like help ordering these parts for testing?",
    userOptions: [
      { text: "Yes, I need help ordering parts for testing", nextStep: "order_parts" },
      { text: "No, I'll handle the testing myself", nextStep: "end_conversation" }
    ]
  },

  check_continuity: {
    id: 'check_continuity',
    botMessage: "Let's check your circuit breaker. Can you test for continuity through the 12038-Circuit Breaker?",
    userOptions: [
      { text: "Yes, there is continuity through the breaker", nextStep: "replace_battery_harness" },
      { text: "No, there is no continuity", nextStep: "replace_breaker" }
    ]
  },

  replace_battery_harness: {
    id: 'replace_battery_harness',
    botMessage: "The issue is with your battery wire connections. You'll need to replace the battery harnesses with a 9853-Battery Harness Kit. Would you like help ordering this part?",
    userOptions: [
      { text: "Yes, I need to order the battery harness kit", nextStep: "order_parts" },
      { text: "No, I'll handle the replacement myself", nextStep: "end_conversation" }
    ]
  },

  // Shared end states
  contact_agent: {
    id: 'contact_agent',
    botMessage: "I'll connect you with our customer service team for additional assistance. You can reach our support team at 1-800-692-6446 or email support@amigomobility.com",
    userOptions: []
  },

  order_parts: {
    id: 'order_parts',
    botMessage: "I'll connect you with our parts department to help you order the required components. They'll make sure you get exactly what you need for your Vista!",
    userOptions: []
  },

  end_conversation: {
    id: 'end_conversation',
    botMessage: "Thank you for using Amigo's troubleshooting assistant! If you need any further help, please don't hesitate to contact us. We're always here to help!",
    userOptions: []
  }
};
