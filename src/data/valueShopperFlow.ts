
export interface ConversationStep {
  botMessage: string | string[];
  userOptions: {
    text: string;
    nextStep: string;
  }[];
}

export const valueShopperFlow: Record<string, ConversationStep> = {
  greeting: {
    botMessage: "Hello! I'm Amigo Mobility's virtual assistant, and I'm here to help you troubleshoot your ValueShopper. What seems to be the issue you're experiencing?",
    userOptions: [
      {
        text: "My ValueShopper turns on, but the charger will not turn on or the batteries do not hold a charge",
        nextStep: "Step_For_VS_battery_troubleshooting"
      },
      {
        text: "My ValueShopper will not move",
        nextStep: "Step_For_VS_wont_move"
      },
      {
        text: "I have a different customer service need.",
        nextStep: "contact_agent"
      }
    ]
  },

  Step_For_VS_battery_troubleshooting: {
    botMessage: "Let's start by checking your charger connection. Please plug the AC cord into the wall outlet and let me know what happens next.",
    userOptions: [
      {
        text: "Okay, I've plugged it in. What should I look for?",
        nextStep: "check_battery_indicator"
      }
    ]
  },

  check_battery_indicator: {
    botMessage: "Great! Now let's check your battery indicator. If you have an LED battery gauge on your throttle, does it flash for 10-30 seconds before going solid? Or if you have an LCD display, does it show a green rectangle at the bottom with 'CHARGING' text?",
    userOptions: [
      {
        text: "Yes, I see the charging indicator",
        nextStep: "measure_record_battery_voltage"
      },
      {
        text: "No, I don't see any charging indicator",
        nextStep: "AC_cord_illuminate"
      }
    ]
  },

  measure_record_battery_voltage: {
    botMessage: "Perfect! Now let's test your battery voltage. First, unplug the AC cord from the wall and measure the voltage on your batteries. Then plug it back in, wait 2 minutes, and measure again. Has the voltage increased to at least 25 volts?",
    userOptions: [
      {
        text: "Yes, the voltage increased to 25 volts or more",
        nextStep: "replace_batteries_vs1"
      },
      {
        text: "No, the voltage didn't reach 25 volts",
        nextStep: "replace_battery_charger_vs1"
      }
    ]
  },

  replace_batteries_vs1: {
    botMessage: "Your charger is working properly, but your batteries have reached the end of their life and can no longer hold a proper charge. They'll need to be replaced. Would you like help ordering new batteries?",
    userOptions: [
      {
        text: "Yes, I need to order new batteries",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_battery_charger_vs1: {
    botMessage: "It looks like your battery charger isn't outputting the proper voltage and needs to be replaced. Would you like help ordering a replacement charger?",
    userOptions: [
      {
        text: "Yes, I need to order a new charger",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  AC_cord_illuminate: {
    botMessage: "Let's check if your AC cord is working. Look at the end of the AC cord that plugs into the wall - does it have a small light that illuminates when plugged in?",
    userOptions: [
      {
        text: "Yes, there's a light on the AC cord",
        nextStep: "charger_not_turning_on"
      },
      {
        text: "No, there's no light on the AC cord",
        nextStep: "wall_outlet_AC_replacement"
      }
    ]
  },

  wall_outlet_AC_replacement: {
    botMessage: "Let's make sure your wall outlet is working by testing it with another device. If the outlet works fine, then your AC cord needs to be replaced. Do you need help ordering a replacement AC cord?",
    userOptions: [
      {
        text: "Yes, I need to order a new AC cord",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  charger_not_turning_on: {
    botMessage: "Since your AC cord is getting power but the charger isn't turning on, let's check the IEC receptacle connection. Can you check if there's continuity in the 11024-IEC Receptacle?",
    userOptions: [
      {
        text: "No continuity in the receptacle",
        nextStep: "replace_11024_receptacle"
      },
      {
        text: "Yes, there is continuity",
        nextStep: "measure_the_voltage"
      }
    ]
  },

  replace_11024_receptacle: {
    botMessage: "You'll need to replace the 11024-Receptacle. Would you like help ordering this part?",
    userOptions: [
      {
        text: "Yes, I need to order the receptacle",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  measure_the_voltage: {
    botMessage: "Now let's check your battery voltage. If you have AGM batteries, measure both batteries together - they need at least 16 volts combined. If you have a single lithium battery, it needs at least 21 volts. What's your voltage reading?",
    userOptions: [
      {
        text: "The batteries are under the minimum voltage",
        nextStep: "replace_batteries_vs2"
      },
      {
        text: "The batteries meet the minimum voltage requirement",
        nextStep: "check_circuit_breaker"
      }
    ]
  },

  replace_batteries_vs2: {
    botMessage: "Your batteries need to be replaced since they're not holding enough voltage. Would you like help ordering replacement batteries?",
    userOptions: [
      {
        text: "Yes, I need to order new batteries",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  check_circuit_breaker: {
    botMessage: "Let's check your circuit breaker. Can you test the continuity of the circuit breaker to see if it's working properly?",
    userOptions: [
      {
        text: "Yes, the circuit breaker has continuity",
        nextStep: "DC_wiring_connections"
      },
      {
        text: "No, the circuit breaker has no continuity",
        nextStep: "replace_circuit_breaker"
      }
    ]
  },

  replace_circuit_breaker: {
    botMessage: "You'll need to replace the 12038-Circuit Breaker. Would you like help ordering this part?",
    userOptions: [
      {
        text: "Yes, I need to order the circuit breaker",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  DC_wiring_connections: {
    botMessage: "Let's check your wiring connections. Please make sure all the DC wiring connections from the charger to the controller are tight and secure. How do the connections look?",
    userOptions: [
      {
        text: "The DC wiring harness looks damaged or loose",
        nextStep: "replace_harness"
      },
      {
        text: "The DC wiring connections look good",
        nextStep: "replace_battery_charger_vs2"
      }
    ]
  },

  replace_harness: {
    botMessage: "You'll need to replace the DC cable harness. If your charger has a removable DC cable, you can order the 7852.10-DC Cable Harness. If it's hard-wired, you'll need a new battery charger. Would you like help ordering the right part?",
    userOptions: [
      {
        text: "Yes, I need help ordering the right part",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_battery_charger_vs2: {
    botMessage: "Based on our troubleshooting, your battery charger needs to be replaced. Would you like help ordering a replacement charger?",
    userOptions: [
      {
        text: "Yes, I need to order a new charger",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  Step_For_VS_wont_move: {
    botMessage: "Let's start by checking if your ValueShopper is getting power. When you turn it on, does the battery display or diagnostic window on the throttle light up?",
    userOptions: [
      {
        text: "Yes, the display lights up",
        nextStep: "numeral_diagnostic_window"
      },
      {
        text: "No, nothing lights up",
        nextStep: "test_battery_voltage"
      }
    ]
  },

  numeral_diagnostic_window: {
    botMessage: "Great! Now let's check for any error codes. Do you see any numbers displayed in the diagnostic window?",
    userOptions: [
      {
        text: "Yes, I see a number in the diagnostic window",
        nextStep: "diagnose_code_guide"
      },
      {
        text: "No, I don't see any numbers",
        nextStep: "sit_on_VS_seat"
      }
    ]
  },

  diagnose_code_guide: {
    botMessage: "The number you're seeing is a diagnostic code that indicates a specific issue with your ValueShopper. Please refer to your Amigo Diagnostic Code Guide to find the exact steps for resolving this code, or contact our support team for assistance with the specific code you're seeing.",
    userOptions: []
  },

  sit_on_VS_seat: {
    botMessage: "Your ValueShopper has a safety feature that requires someone to be sitting in the seat. Please sit in the seat and make sure you're pressing down on the safety switch. Does your ValueShopper move now?",
    userOptions: [
      {
        text: "Yes, it moves now!",
        nextStep: "problem_resolved"
      },
      {
        text: "No, it still won't move",
        nextStep: "disconnect_seat_switch_wires"
      }
    ]
  },

  problem_resolved: {
    botMessage: "Wonderful! Your ValueShopper is working properly now. The issue was simply the seat safety switch needing to be activated. If you have any other questions, feel free to ask!",
    userOptions: []
  },

  disconnect_seat_switch_wires: {
    botMessage: "Let's test if the seat switch is working properly. Carefully disconnect the seat switch wires and create a temporary jumper connection across the two wires. Does your ValueShopper move now when you operate the throttle?",
    userOptions: [
      {
        text: "Yes, it moves with the jumper connection",
        nextStep: "replace_seat_switch"
      },
      {
        text: "No, it still doesn't move",
        nextStep: "replace_wire_harness_vs"
      }
    ]
  },

  replace_seat_switch: {
    botMessage: "Perfect! That confirms your seat switch needs to be replaced. Would you like help ordering a new seat switch?",
    userOptions: [
      {
        text: "Yes, I need to order a seat switch",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_wire_harness_vs: {
    botMessage: "The issue is with your wire harness. You'll need to replace the 10947-18 Pin Wire Harness. Would you like help ordering this part?",
    userOptions: [
      {
        text: "Yes, I need to order the wire harness",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  test_battery_voltage: {
    botMessage: "Since there's no power to the display, let's check your battery. You'll need to remove the seat assembly and rear cover to access the controller. Can you test the battery voltage at the controller? It should be greater than 21 volts.",
    userOptions: [
      {
        text: "Yes, the battery voltage is above 21 volts",
        nextStep: "check_wiring_connections"
      },
      {
        text: "No, the battery voltage is 21 volts or less",
        nextStep: "recharge_battery_or_replace"
      }
    ]
  },

  recharge_battery_or_replace: {
    botMessage: "Your battery needs to be recharged or replaced. Try recharging your battery completely first. If it still doesn't hold a charge above 21 volts, you'll need new batteries. Would you like help ordering replacement batteries?",
    userOptions: [
      {
        text: "Yes, I need to order new batteries",
        nextStep: "order_parts"
      }
    ]
  },

  check_wiring_connections: {
    botMessage: "Let's check all your wiring connections. Make sure all wires from the handle and controller are securely connected, then measure the battery voltage at the controller. Does it match the voltage you measured at the battery itself?",
    userOptions: [
      {
        text: "Yes, the voltages match and connections are secure",
        nextStep: "check_label_motor_controller"
      },
      {
        text: "No, the voltages don't match or connections are loose",
        nextStep: "check_continuity_thru_breaker"
      }
    ]
  },

  check_continuity_thru_breaker: {
    botMessage: "Let's check your circuit breaker. Can you test for continuity through the 12038-Circuit Breaker?",
    userOptions: [
      {
        text: "Yes, there is continuity through the breaker",
        nextStep: "replace_battery_wire"
      },
      {
        text: "No, there is no continuity",
        nextStep: "replace_circuit_breaker_vs2"
      }
    ]
  },

  replace_circuit_breaker_vs2: {
    botMessage: "You'll need to replace the 12038-Circuit Breaker. Would you like help ordering this part?",
    userOptions: [
      {
        text: "Yes, I need to order the circuit breaker",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_battery_wire: {
    botMessage: "The issue is with your battery wire connections. You'll need to replace the battery wire assemblies with a 9853-Battery Wire Disconnect kit. Would you like help ordering this part?",
    userOptions: [
      {
        text: "Yes, I need to order the battery wire kit",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  check_label_motor_controller: {
    botMessage: "Let's check if you have the right controller for your handle type. Look at the part number label on your motor controller. Does it match the type of handle you have (LED or LCD display)?",
    userOptions: [
      {
        text: "Yes, the controller matches my handle type",
        nextStep: "substitute_parts"
      },
      {
        text: "No, the controller doesn't match my handle type",
        nextStep: "replace_motor_controller"
      }
    ]
  },

  substitute_parts: {
    botMessage: "We'll need to test some components to find the faulty part. Try substituting these parts one at a time until you find the problem: 1) Handle cable, 2) Throttle assembly, 3) Controller. Would you like help ordering these parts for testing?",
    userOptions: [
      {
        text: "Yes, I need help ordering parts for testing",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the testing myself",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_motor_controller: {
    botMessage: "You need to replace your motor controller with the correct version that matches your handle type. Would you like help ordering the right controller?",
    userOptions: [
      {
        text: "Yes, I need help ordering the correct controller",
        nextStep: "order_parts"
      },
      {
        text: "No, I'll handle the replacement myself",
        nextStep: "end_conversation"
      }
    ]
  },

  // Shared steps
  order_parts: {
    botMessage: "I'll connect you with our parts department to help you order the required components. They'll make sure you get exactly what you need for your ValueShopper!",
    userOptions: []
  },

  contact_agent: {
    botMessage: "I'll connect you with one of our friendly customer service representatives who can assist you further.",
    userOptions: []
  },

  end_conversation: {
    botMessage: "Thank you for using Amigo's troubleshooting assistant! If you need any further help, please don't hesitate to contact us. We're always here to help!",
    userOptions: []
  }
};
