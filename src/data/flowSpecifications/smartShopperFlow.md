
# SmartShopper Troubleshooting Flow Specification

## Start at: Greeting

### == Greeting ==

Bot says:
- "Hello, this is the bot."
- "What seems to be the issue?"

User can choose:
- "My SmartShopper turns on, but the charger will not turn on or the batteries do not hold a charge" -> go to: Step_For_SS_battery_troubleshooting
- "My SmartShopper will not move" -> go to: Step_For_SS_wont_move

### == Step_For_SS_battery_troubleshooting ==

Bot says:
- "Connect the AC cord to the wall outlet."
- "For the LED throttle enclosure battery gage: does the battery gage on the throttle enclosure flash for 10-30 seconds before going solid?"
- "For the LCD throttle enclosure display: does the display show a green rectangle at the bottom with the text "CHARGING"?"

User says:
- "Yes" -> go to: ac_cord_illuminate
- "No" -> go to: measure_record_voltage

### == ac_cord_illuminate ==

Bot says:
- "Does the AC cord end illuminate?"

User says:
- "Yes" -> go to: charger_not_turning_on
- "No" -> go to: wall_outlet_replace_cord

### == wall_outlet_replace_cord ==

Bot says:
- "Check to see if the wall outlet is working. If the wall outlet is working replace the AC cord."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == charger_not_turning_on ==

Bot says:
- "This indicates the charger is not turning on. Let's determine why it won't turn on."
- "Check the 11024-IEC Receptacle for continuity."

User says:
- "Yes continuity" -> go to: measure_voltage
- "No continuity" -> go to: replace_receptacle

### == replace_receptacle ==

Bot says:
- "You need to replace the 11024-Receptacle."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == measure_voltage ==

Bot says:
- "If you have AGM batteries, measure the voltage on both batteries in the series; they must have a minimum combined voltage of 16 volts. If you have a single lithium battery it must have a minimum voltage of 21 volts."

User says:
- "Batteries are under voltage" -> go to: replace_batteries
- "Batteries have the minimum required voltage" -> go to: check_circuit_breaker

### == replace_batteries ==

Bot says:
- "You need to replace the battery/batteries."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == check_circuit_breaker ==

Bot says:
- "Check continuity of circuit breaker"

User says:
- "No continuity" -> go to: replace_breaker
- "Yes continuity" -> go to: check_dc_wiring

### == replace_breaker ==

Bot says:
- "You need to replace the 12038-Circuit Breaker."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == check_dc_wiring ==

Bot says:
- "Check to make sure the Dc wiring connections from the charger are securely connected to the controller."

User says:
- "The Dc wiring harness is bad" -> go to: replace_harness_or_charger
- "Dc wiring is good" -> go to: replace_battery_charger

### == replace_harness_or_charger ==

Bot says:
- "You need to replace the 7852.10-Dc Cable Harness if the battery charger has a removable Dc cable. If the Dc cable is hard-wired into the charger, you must replace the battery charger."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == replace_battery_charger ==

Bot says:
- "The battery charger needs to be replaced."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == measure_record_voltage ==

Bot says:
- "With the Ac cord disconnected from the wall outlet, measure and record the voltage on the batteries. Now connect the Ac cord to the wall outlet, and let the batteries charge for two minutes."
- "Now measure the battery voltage, has it increased to a minimum of 25 volts?"

User says:
- "Yes" -> go to: replace_batteries
- "No" -> go to: replace_battery_charger

### == Step_For_SS_wont_move ==

Bot says:
- "Does the battery display or diagnostic code window on the throttle enclosure illuminate when the SmartShopper is turned on?"

User says:
- "Yes" -> go to: numeral_diagnostic_window
- "No" -> go to: remove_seat_test_voltage

### == numeral_diagnostic_window ==

Bot says:
- "Is there a numeral illuminated in the diagnostic window?"

User says:
- "Yes" -> go to: diagnostic_issue
- "No" -> go to: sit_on_SS_try_again

### == sit_on_SS_try_again ==

Bot says:
- "There must be a rider activating the safety switch in the seat. Sit in the seat and make sure the switch is has been depressed. Does the SmartShopper now move?"

User says:
- "Yes" -> go to: problem_resolved
- "No" -> go to: disconnect_seat_switch

### == problem_resolved ==

Bot says:
- "Your problem has been resolved." -> go to: end_conversation

### == disconnect_seat_switch ==

Bot says:
- "Disconnect the seat switch wires from the seat switch. Jumper across the two seat switch wires you just disconnected to complete the circuit. Does the SmartShopper move now when the throttle lever is operated?"

User says:
- "Yes" -> go to: replace_seat_switch
- "No" -> go to: replace_wire_harness

### == replace_seat_switch ==

Bot says:
- "You need to replace the seat switch."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == replace_wire_harness ==

Bot says:
- "You need to replace the 10947-18 Pin Wire Harness."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == remove_seat_test_voltage ==

Bot says:
- "This indicates the motor controller has detected a diagnostic issue. Is the numeral in the diagnostic window a "2"? Usually, the numeral "2" displays because the brake circuit is open."

User says:
- "Yes" -> go to: freewheel_lever
- "No" -> go to: diagnostic_code_guide

### == freewheel_lever ==

Bot says:
- "Turn the SmartShopper off, reach through the slot in the cover next to the right rear wheel and make sure the freewheel lever is pulled all the way to the rear in the Normal position."
- "Turn the key back on. If the "2" code is still illuminated, check the continuity on the brake wiring. If the wires are good, you need to replace the 11087-Brake."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == diagnostic_code_guide ==

Bot says:
- "Use the Amigo Diagnostic Code Guide to review the next steps to take to replace the component causing the diagnostic code."

go to: end_conversation

### == recharge_batteries ==

Bot says:
- "Recharge the battery/batteries and allow them to go through a completed charge cycle. If cart still has no power, replace the 12168.20-Battery (Lithium) or 8967-Batteries (AGM Type)."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == check_wiring ==

Bot says:
- "Check to ensure all wiring connections from the handle enclosure and controller are securely connected. Measure the battery voltage at the controller, it should match the battery voltage measured at the battery/batteries. Are the wires secure and battery at the controller? Does the voltage at the controller's battery/batteries match the voltage at the battery?"

User says:
- "Yes" -> go to: substitute_parts
- "No" -> go to: check_circuit_breaker

### == substitute_parts ==

Bot says:
- "Substitute the following parts in order until the faulty part is found:
  1. Handle cable
  2. Throttle Assembly
  3. Controller"
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation

### == replace_battery_wire ==

Bot says:
- "You need to replace the battery wire asms with a 9853-Battery Wire Disconnect kit."
- "Do you need to order parts?"

User says:
- "Yes" -> go to: order_parts
- "No" -> go to: end_conversation
