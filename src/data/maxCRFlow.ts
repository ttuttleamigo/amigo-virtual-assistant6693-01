
export const maxCRFlow = {
  greeting: {
    id: 'greeting',
    botMessage: [
      "Hello, this is the bot.",
      "What seems to be the issue?"
    ],
    userOptions: [
      { text: "My Max CR turns on, but the charger will not turn on or the batteries do not hold a charge", nextStep: "step_for_max_cr_battery_troubleshooting" },
      { text: "My Max CR will not move", nextStep: "step_for_max_cr_wont_move" },
      { text: "My Max CR remote won't pair", nextStep: "step_for_max_cr_remote_pairing" },
      { text: "I have a different customer service need", nextStep: "contact_agent" }
    ]
  },

  step_for_max_cr_battery_troubleshooting: {
    id: 'step_for_max_cr_battery_troubleshooting',
    botMessage: "First, connect the AC cord to the wall outlet. Does the battery display on the throttle enclosure flash for 10-30 seconds before going solid?",
    userOptions: [
      { text: "Yes", nextStep: "measure_battery_voltage" },
      { text: "No", nextStep: "ac_cord_illumination" }
    ]
  },

  measure_battery_voltage: {
    id: 'measure_battery_voltage',
    botMessage: "Disconnect the AC cord from the wall outlet and measure and record the voltage on the battery. Then connect the AC cord into the wall outlet and let the batteries charge for two minutes. After they have charged, measure the battery voltage. Has it increased to a minimum of 25 volts?",
    userOptions: [
      { text: "Yes", nextStep: "replace_battery" },
      { text: "No", nextStep: "replace_battery_charger" }
    ]
  },

  replace_battery_charger: {
    id: 'replace_battery_charger',
    botMessage: [
      "The battery charger is not outputting the proper Dc voltage, and it will need to be replaced. Replace the battery charger with P/N 12499.22-Charger for AGM or P/N 12499.23-Charger for Lithium.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  replace_battery: {
    id: 'replace_battery',
    botMessage: [
      "The charger is operating properly. The battery/batteries have reached a state where they can no longer hold a charge and should be replaced.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  ac_cord_illumination: {
    id: 'ac_cord_illumination',
    botMessage: "Does the AC cord end illuminate?",
    userOptions: [
      { text: "Yes", nextStep: "charger_troubleshooting" },
      { text: "No", nextStep: "wall_outlet" }
    ]
  },

  wall_outlet: {
    id: 'wall_outlet',
    botMessage: [
      "Check to see if the wall outlet is working. If the wall outlet is working, replace the AC cord.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  charger_troubleshooting: {
    id: 'charger_troubleshooting',
    botMessage: [
      "This indicates the charger is not turning on. Use the following steps to determine why it will not turn on.",
      "Check the 13084-IEC Receptacle for continuity."
    ],
    userOptions: [
      { text: "Yes continuity", nextStep: "measure_battery_voltage_check" },
      { text: "No continuity", nextStep: "replace_receptacle" }
    ]
  },

  replace_receptacle: {
    id: 'replace_receptacle',
    botMessage: [
      "You need to replace the 13084-IEC Receptacle.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  measure_battery_voltage_check: {
    id: 'measure_battery_voltage_check',
    botMessage: "If you have AGM batteries, measure the voltage on both batteries in the series; they must have a minimum combined voltage of 16-volts. If you have a single lithium battery, it must have a minimum voltage of 21-volts.",
    userOptions: [
      { text: "Batteries under voltage", nextStep: "replace_fuse" },
      { text: "Batteries have minimum required voltage", nextStep: "remove_fuse_check_continuity" }
    ]
  },

  replace_fuse: {
    id: 'replace_fuse',
    botMessage: [
      "Replace the fuse with a 25A 250V replacement.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  remove_fuse_check_continuity: {
    id: 'remove_fuse_check_continuity',
    botMessage: "Remove the fuse and check continuity.",
    userOptions: [
      { text: "Yes continuity", nextStep: "replace_battery_charger_fuse" },
      { text: "No continuity", nextStep: "replace_fuse_no_continuity" }
    ]
  },

  replace_battery_charger_fuse: {
    id: 'replace_battery_charger_fuse',
    botMessage: [
      "Replace the 12499.21-battery charger if the batteries are AGM. Replace the 12499.22-battery charger if battery is lithium.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  replace_fuse_no_continuity: {
    id: 'replace_fuse_no_continuity',
    botMessage: [
      "Replace the fuse with a 25A 250V replacement.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  step_for_max_cr_wont_move: {
    id: 'step_for_max_cr_wont_move',
    botMessage: [
      "First, turn the Max CR key on.",
      "Does the battery display or diagnostic code window on the throttle enclosure illuminate when the key is turned on?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "battery_display" },
      { text: "No", nextStep: "test_battery_voltage" }
    ]
  },

  battery_display: {
    id: 'battery_display',
    botMessage: "Is the battery display flashing rapidly?",
    userOptions: [
      { text: "Yes", nextStep: "belly_switch" },
      { text: "No", nextStep: "numeral_2" }
    ]
  },

  belly_switch: {
    id: 'belly_switch',
    botMessage: [
      "Is the belly switch pushed in? Rotate the switch clockwise a quarter turn to release it. If this does not resolve the problem, check to make sure the 13147.20-Belly Switch asm is connected to the 13059-Breakout PCB.",
      "Did either of these two procedures clear the rapid flashing?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "problem_resolved" },
      { text: "No", nextStep: "disconnect_belly_switch" }
    ]
  },

  problem_resolved: {
    id: 'problem_resolved',
    botMessage: "Your problem has been resolved.",
    userOptions: [
      { text: "Continue", nextStep: "end_conversation" }
    ]
  },

  disconnect_belly_switch: {
    id: 'disconnect_belly_switch',
    botMessage: [
      "Disconnect the 13147.20-Belly Switch asm from the 13059-Breakout PCB. Using a wire jumper, jumper across the two pins where you just disconnected the Belly Switch asm.",
      "Did this clear the rapid flashing?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "replace_belly_switch" },
      { text: "No", nextStep: "replace_pcb" }
    ]
  },

  replace_belly_switch: {
    id: 'replace_belly_switch',
    botMessage: [
      "Replace the 13147.20-Belly Switch Asm.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  replace_pcb: {
    id: 'replace_pcb',
    botMessage: [
      "Replace the 13059-Breakout PCB.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  numeral_2: {
    id: 'numeral_2',
    botMessage: "Is the numeral \"2\" illuminated in the diagnostic window?",
    userOptions: [
      { text: "Yes", nextStep: "brake_circuit" },
      { text: "No", nextStep: "diagnostic_code_guide" }
    ]
  },

  brake_circuit: {
    id: 'brake_circuit',
    botMessage: [
      "This indicates the brake circuit is open. Turn the key off, check to make sure the freewheel lever in front of the Max CR is in the Normal position, and turn the key back on.",
      "If the \"2\" code is still illuminated, check the continuity on the brake wiring. If the wires are good, replace the 13077-Brake Wire Harness.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  diagnostic_code_guide: {
    id: 'diagnostic_code_guide',
    botMessage: "Use the Amigo Diagnostic Code Guide to review the next steps to take to replace the component causing the diagnostic code.",
    userOptions: [
      { text: "Continue", nextStep: "end_conversation" }
    ]
  },

  test_battery_voltage: {
    id: 'test_battery_voltage',
    botMessage: "Remove the top to the power box and test the battery voltage at the controller. Is the battery voltage greater than 21 volts?",
    userOptions: [
      { text: "Yes", nextStep: "wiring_connections" },
      { text: "No", nextStep: "recharge_batteries" }
    ]
  },

  recharge_batteries: {
    id: 'recharge_batteries',
    botMessage: [
      "Recharge the battery/batteries, allowing them to go through a completed charge cycle.",
      "If the cart still has no power, you will need to replace the 12402-Battery (Lithium) or 12947-Batteries (AGM Type).",
      "Is there continuity?"
    ],
    userOptions: [
      { text: "Yes continuity", nextStep: "measure_voltage" },
      { text: "No power", nextStep: "replace_battery_recharge" }
    ]
  },

  replace_battery_recharge: {
    id: 'replace_battery_recharge',
    botMessage: "Do you need to order parts?",
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  measure_voltage: {
    id: 'measure_voltage',
    botMessage: "If you have AGM batteries, measure the voltage on both batteries in series; they must have a minimum combined voltage of 16 volts. If you have a single lithium battery it must have a minimum voltage of 21 volts.",
    userOptions: [
      { text: "Batteries under voltage", nextStep: "replace_batteries" },
      { text: "Batteries have minimum required voltage", nextStep: "check_leds" }
    ]
  },

  replace_batteries: {
    id: 'replace_batteries',
    botMessage: [
      "You need to replace the batteries. Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  check_leds: {
    id: 'check_leds',
    botMessage: "Check the LEDs on the battery charger. They should be either solid red, red & yellow flashing, or green. If they are, the charger is working.",
    userOptions: [
      { text: "LEDs illuminate", nextStep: "charge_batteries_replace_if_needed" },
      { text: "No LEDs illuminate on the battery charger or just the red LED is flashing", nextStep: "remove_fuse_check_continuity_leds" }
    ]
  },

  charge_batteries_replace_if_needed: {
    id: 'charge_batteries_replace_if_needed',
    botMessage: "Allow the batteries to fully charge. If they do not have enough capacity to run the cart for 8 hours, replace the batteries.",
    userOptions: [
      { text: "Continue", nextStep: "end_conversation" }
    ]
  },

  remove_fuse_check_continuity_leds: {
    id: 'remove_fuse_check_continuity_leds',
    botMessage: "Remove the fuse and check continuity.",
    userOptions: [
      { text: "No continuity", nextStep: "replace_fuse_leds" },
      { text: "Yes continuity", nextStep: "replace_battery_charger_leds" }
    ]
  },

  replace_fuse_leds: {
    id: 'replace_fuse_leds',
    botMessage: [
      "Replace the fuse with a 25A 250V replacement.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  replace_battery_charger_leds: {
    id: 'replace_battery_charger_leds',
    botMessage: [
      "Replace the 12499.21-battery charger if the batteries are AGM. Replace the 12499.22-battery charger if the battery is lithium.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  wiring_connections: {
    id: 'wiring_connections',
    botMessage: [
      "Check to ensure all wiring connections from the handle enclosure, breakout board, and controller are securely connected. Measure the battery voltage at the controller. It should match the battery voltage measured at the battery/batteries.",
      "Are wires secure and battery at the controller? Does voltage at the battery/batteries match the voltage at the battery?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "substitute_parts" },
      { text: "No", nextStep: "check_circuit_breaker_continuity" }
    ]
  },

  substitute_parts: {
    id: 'substitute_parts',
    botMessage: [
      "Substitute the following parts in order until the faulty part is found:",
      "1. 8969-Handle cable",
      "2. 8223.25-Throttle Asm",
      "3. 12933CR-Controller",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  check_circuit_breaker_continuity: {
    id: 'check_circuit_breaker_continuity',
    botMessage: "Check to make sure there is continuity through the 12661-Circuit Breaker. Is there continuity?",
    userOptions: [
      { text: "Yes", nextStep: "replace_harness_battery_harness" },
      { text: "No", nextStep: "replace_circuit_breaker" }
    ]
  },

  replace_harness_battery_harness: {
    id: 'replace_harness_battery_harness',
    botMessage: [
      "Replace the 11190-Harness (2 pieces) and the 13093-Battery Harness.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  replace_circuit_breaker: {
    id: 'replace_circuit_breaker',
    botMessage: [
      "Replace the 12661-Circuit Breaker.",
      "Do you need to order parts?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  step_for_max_cr_remote_pairing: {
    id: 'step_for_max_cr_remote_pairing',
    botMessage: [
      "Attempt the pairing process. Turn the Max CR and the remote on. Press the \"STOP\" button on the remote for 10 seconds. The power button on the remote will flash blue. Press and hold the pairing button on the Max CR until the horn sounds.",
      "Does the Max CR now respond to the remote?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "try_3_steps" },
      { text: "No", nextStep: "press_power_button" }
    ]
  },

  try_3_steps: {
    id: 'try_3_steps',
    botMessage: [
      "If the remote only loses connection with the Max CR intermittently there are 3 steps to try:",
      "1. Attempt to pair the remote in the exact location where the connection is lost. The remote is designed to search for the clearest communication channel if there is interference from other devices.",
      "2. If the remote works well when you are close to the Max CR but consistently loses connectivity if you get to the end of the line of carts, replace the 13147.20-Antenna.",
      "3. If the Max CR will not respond when only pushing specific buttons on the remote, the membrane on the remote does not contact properly and needs to be replaced."
    ],
    userOptions: [
      { text: "I need to replace the antenna and need to order parts", nextStep: "order_parts" },
      { text: "I need to replace the remote membrane and need to order parts", nextStep: "order_parts" },
      { text: "I need to replace a part, but I don't need to order anything", nextStep: "end_conversation" },
      { text: "None of these options", nextStep: "contact_agent" }
    ]
  },

  press_power_button: {
    id: 'press_power_button',
    botMessage: "OK. Press the power button on the remote. Does it illuminate green?",
    userOptions: [
      { text: "No", nextStep: "replace_aa_batteries" },
      { text: "Yes", nextStep: "inspect_wiring" }
    ]
  },

  inspect_wiring: {
    id: 'inspect_wiring',
    botMessage: "Inspect all the wiring running between the receiver board and the breakout board. If the wiring is good, first replace the 12344-receiver board, if that doesn't resolve the problem replace the 13059-breakout board.",
    userOptions: [
      { text: "I need to order parts", nextStep: "order_parts" }
    ]
  },

  replace_aa_batteries: {
    id: 'replace_aa_batteries',
    botMessage: [
      "Replace the batteries in the remote with four new lithium AA batteries or recharge the batteries if you have a remote with the rechargeable option.",
      "Press the remote power button, does it illuminate green?"
    ],
    userOptions: [
      { text: "Yes", nextStep: "step_for_max_cr_remote_pairing" },
      { text: "No", nextStep: "replace_remote" }
    ]
  },

  replace_remote: {
    id: 'replace_remote',
    botMessage: "You need to replace the remote. Do you want to order a new one?",
    userOptions: [
      { text: "Yes", nextStep: "order_parts" },
      { text: "No", nextStep: "end_conversation" }
    ]
  },

  order_parts: {
    id: 'order_parts',
    botMessage: "I'll connect you with our parts department to help you order the required components. They'll make sure you get exactly what you need for your Max CR!",
    userOptions: [
      { text: "Continue", nextStep: "contact_agent" }
    ]
  },

  contact_agent: {
    id: 'contact_agent',
    botMessage: "I'll connect you with our parts department to help you order the required components. They'll make sure you get exactly what you need for your Max CR!",
    userOptions: []
  },

  end_conversation: {
    id: 'end_conversation',
    botMessage: "Did I solve your issue today?",
    userOptions: [
      { text: "Yes", nextStep: "glad_to_help_anything_else" },
      { text: "No", nextStep: "sorry_talk_to_agent" }
    ]
  },

  glad_to_help_anything_else: {
    id: 'glad_to_help_anything_else',
    botMessage: "Glad I could help! Are there other service needs you need help you with today?",
    userOptions: [
      { text: "Yes", nextStep: "contact_agent" },
      { text: "No", nextStep: "thank_you_goodbye" }
    ]
  },

  sorry_talk_to_agent: {
    id: 'sorry_talk_to_agent',
    botMessage: "Sorry I couldn't help. Looks like you need to talk to a factory service agent.",
    userOptions: [
      { text: "Continue", nextStep: "contact_agent" }
    ]
  },

  thank_you_goodbye: {
    id: 'thank_you_goodbye',
    botMessage: "Thank you for choosing Amigo for your mobility needs. Have a great day!",
    userOptions: [],
    isEndStep: true
  }
};
