
import { ConversationFlow } from './conversationFlow';

export const vistaFlow: ConversationFlow = {
  greeting: {
    botMessage: [
      "Hello! I'm Amigo Mobility's virtual assistant, and I'm here to help you troubleshoot your Vista.",
      "What seems to be the issue you're experiencing?"
    ],
    userOptions: [
      {
        text: "My Vista turns on, but the charger will not turn on or the batteries do not hold a charge",
        nextStep: "Step_For_Vista_battery_troubleshooting"
      },
      {
        text: "My Vista will not move",
        nextStep: "Step_For_Vista_wont_move"
      },
      {
        text: "I have a different customer service need.",
        nextStep: "contact_agent"
      }
    ]
  },

  Step_For_Vista_battery_troubleshooting: {
    botMessage: [
      "Connect the AC cord to the wall outlet.",
      "For the throttle enclosure LED battery gage: does the battery gage on the throttle enclosure flash for 10-30 seconds before going solid?",
      "For the throttle enclosure LCD throttle display: does the display show a green rectangle at the bottom with the text \"CHARGING\"?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "charge_batteries_measure_voltage"
      },
      {
        text: "No",
        nextStep: "ac_cord_illuminate"
      }
    ]
  },

  charge_batteries_measure_voltage: {
    botMessage: [
      "With the AC cord disconnected from the wall outlet, measure and record the voltage on the batteries.",
      "Now connect the AC cord into the wall outlet and let the batteries charge for two minutes.",
      "Now measure the battery voltage, has it increased to a minimum of 25 volts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "charger_fine_replace_batteries"
      },
      {
        text: "No",
        nextStep: "replace_charger"
      }
    ]
  },

  charger_fine_replace_batteries: {
    botMessage: [
      "The charger is operating properly, but the battery/batteries have reached a state where they can no longer hold a charge and should be replaced.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_charger: {
    botMessage: [
      "The battery charger is not outputting the proper DC voltage, so you need to replace the battery charger.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  ac_cord_illuminate: {
    botMessage: [
      "Does the AC cord end illuminate?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "charger_not_turning_on"
      },
      {
        text: "No",
        nextStep: "wall_outlet_replace_cord"
      }
    ]
  },

  wall_outlet_replace_cord: {
    botMessage: [
      "Check to see if the wall outlet is working. If the wall outlet is working, you need to replace the AC cord.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  charger_not_turning_on: {
    botMessage: [
      "This indicates the charger is not turning on. Let's determine why it will not turn on.",
      "Check the 11024-IEC Receptacle for continuity."
    ],
    userOptions: [
      {
        text: "Yes continuity",
        nextStep: "check_battery_voltage"
      },
      {
        text: "No continuity",
        nextStep: "replace_batteries"
      }
    ]
  },

  check_battery_voltage: {
    botMessage: [
      "If you have AGM batteries, measure the voltage on both batteries in the series; they must have a minimum combined voltage of 16 volts. If you have a single lithium battery it must have a minimum voltage of 21 volts."
    ],
    userOptions: [
      {
        text: "Batteries are under voltage",
        nextStep: "replace_batteries"
      },
      {
        text: "Batteries have minimum required voltage",
        nextStep: "check_circuit_breaker"
      }
    ]
  },

  replace_batteries: {
    botMessage: [
      "You need to replace the battery/batteries.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  check_circuit_breaker: {
    botMessage: [
      "Check if there is continuity of circuit breaker."
    ],
    userOptions: [
      {
        text: "Yes continuity",
        nextStep: "check_dc_wiring"
      },
      {
        text: "No continuity",
        nextStep: "replace_breaker"
      }
    ]
  },

  replace_breaker: {
    botMessage: [
      "You need to replace the 12038-Circuit Breaker.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  check_dc_wiring: {
    botMessage: [
      "Check to make sure the DC wiring connections from the charger are securely connected to the controller."
    ],
    userOptions: [
      {
        text: "DC wiring harness is bad",
        nextStep: "replace_harness"
      },
      {
        text: "DC wiring is good",
        nextStep: "replace_battery_charger"
      }
    ]
  },

  replace_harness: {
    botMessage: [
      "You need to replace the 7852.10-DC Cable Harness if the battery charger has a removable DC cable. If the DC cable is hard-wired into the charger, you must replace the battery charger.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  replace_battery_charger: {
    botMessage: [
      "You need to replace the battery charger.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  Step_For_Vista_wont_move: {
    botMessage: [
      "Does the battery display or diagnostic code window on the throttle enclosure illuminate when the key is turned on?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "battery_display_flashing"
      },
      {
        text: "No",
        nextStep: "test_battery_voltage"
      }
    ]
  },

  battery_display_flashing: {
    botMessage: [
      "Is the battery display flashing?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "numeral_2_illuminate"
      },
      {
        text: "No",
        nextStep: "make_sure_sitting_try_again"
      }
    ]
  },

  numeral_2_illuminate: {
    botMessage: [
      "Is the numeral \"2\" illuminated in the diagnostic window?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "brake_circuit_open"
      },
      {
        text: "No",
        nextStep: "diagnostic_code_guide"
      }
    ]
  },

  diagnostic_code_guide: {
    botMessage: [
      "If the numeral is something other than \"2,\" refer to the diagnostic code guide and use those troubleshooting steps to determine the root cause of the diagnostic code."
    ],
    userOptions: []
  },

  brake_circuit_open: {
    botMessage: [
      "This indicates the brake circuit is open.",
      "Turn the key off and check to make sure the freewheel lever in the rear of the Vista is in the Normal position.",
      "Turn the key back on, and if the \"2\" code is still illuminated, check the continuity on the brake wiring. If the wires are good replace the 11087-Brake.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  make_sure_sitting_try_again: {
    botMessage: [
      "Make sure you are properly seated and depress the seat switch under the seat cover. Does the Vista now run?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "problem_resolved"
      },
      {
        text: "No",
        nextStep: "throttle_lever_activated"
      }
    ]
  },

  problem_resolved: {
    botMessage: [
      "Your problem has been resolved."
    ],
    userOptions: []
  },

  throttle_lever_activated: {
    botMessage: [
      "Disconnect the two wires from the seat switch terminals coming off 10947-Wire asm. Create a short circuit across the two female terminals you just disconnected.",
      "Does the Vista now run if the throttle lever is activated?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "replace_wire_assembly"
      },
      {
        text: "No",
        nextStep: "swap_parts"
      }
    ]
  },

  replace_wire_assembly: {
    botMessage: [
      "You need to replace the 10947-Wire Assembly.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  swap_parts: {
    botMessage: [
      "This means one of four components is faulty. Swap them in the following order:",
      "1. Replace the 8969-Handle Cable",
      "2. Replace the enclosure matching the current style on the Vista",
      "3. Replace the motor controller matching the current style on the Vista", 
      "4. If none of the previous three parts resolved the issue, then replace the 11042-Drive",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  test_battery_voltage: {
    botMessage: [
      "Remove the 7/16\" bolt underneath the front of the seat that runs between the seat release levers. Test the battery voltage at the controller.",
      "Is the battery voltage greater than 21 volts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "check_wiring"
      },
      {
        text: "No",
        nextStep: "recharge_batteries_replace_batteries"
      }
    ]
  },

  recharge_batteries_replace_batteries: {
    botMessage: [
      "Recharge the battery/batteries and allow them to go through a completed charge cycle. If cart still has no power replace the batteries.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  check_wiring: {
    botMessage: [
      "Check to ensure all wiring connections from the handle enclosure, breakout board, and controller are securely connected.",
      "Measure the battery voltage at the controller; it should match the battery voltage measured at the battery/batteries. Are the wires secure and battery at the controller? Does voltage at the battery/batteries at the controller match the voltage at the battery?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "substitute_parts"
      },
      {
        text: "No",
        nextStep: "check_continuity"
      }
    ]
  },

  substitute_parts: {
    botMessage: [
      "Substitute the following parts in order until the faulty part is found:",
      "1. 8969-Handle cable",
      "2. Enclosure",
      "3. Controller",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  check_continuity: {
    botMessage: [
      "Check to make sure there is continuity through the 12038-Circuit Breaker. Is there continuity?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "replace_battery_harness"
      },
      {
        text: "No",
        nextStep: "replace_breaker"
      }
    ]
  },

  replace_battery_harness: {
    botMessage: [
      "You need to replace the battery harnesses with a 9853-Battery Harness Kit.",
      "Do you need to order parts?"
    ],
    userOptions: [
      {
        text: "Yes",
        nextStep: "order_parts"
      },
      {
        text: "No",
        nextStep: "end_conversation"
      }
    ]
  },

  contact_agent: {
    botMessage: [
      "I'll connect you with our customer service team who can help with your specific needs."
    ],
    userOptions: []
  },

  order_parts: {
    botMessage: [
      "I can help you with ordering parts. Please contact our parts department at 1-800-248-9131 or visit our website for more information."
    ],
    userOptions: []
  },

  end_conversation: {
    botMessage: [
      "Thank you for using Amigo Mobility's troubleshooting assistant. If you need further help, please don't hesitate to contact us."
    ],
    userOptions: []
  }
};
