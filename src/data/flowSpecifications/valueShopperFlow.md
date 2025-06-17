Conversation: ValueShopper troubleshooting
Start at: Greeting
== Greeting ==
Bot says:
- "Hello, this is the bot."
- " What seems to be the issue?”
User can choose:
- "My ValueShopper turns on, but the charger will not turn on or the batteries do not hold a
charge" -> go to: Step_For_VS_battery_troubleshooting
- "My ValueShopper will not move" -> go to: Step_For_VS_wont_move
-“I have a different customer service need.” -> go to: contact_agent
== Step_For_VS_battery_troubleshooting ==
Bot says:
-“Connect the AC cord to the wall outlet.”
-“For the throttle enclosure LED battery gage: does the battery gage on the throttle
enclosure flash for 10-30 seconds before going solid?”
-“For the throttle enclosure LCD display: does the display show a green rectangle at the
bottom with the text "CHARGING"?”
User Says:
-“Yes” -> go to: measure_record_battery_voltage
-“No” -> go to: AC_cord_illuminate
== measure_record_battery_voltage ==
Bot says:
-“With the AC cord disconnected from the wall outlet, measure and record the voltage on
the batteries. Now connect the AC cord into the wall outlet and let the batteries charge for
two minutes.”
-“Now measure the battery voltage, has it increased to a minimum of 25 volts?”
User says:
-“Yes” -> go to: replace_batteries
-“No” -> go to: replace_battery_charger
== replace_batteries ==
Bot says:
-“ The charger is operating properly, but the battery/batteries have reached a state where
they can no longer hold a charge and should be replaced.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_battery_charger ==
Bot says:
-“ The battery charger is not outputting the proper DC voltage, so you need to replace the
battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== AC_cord_illuminate ==
Bot says:
-“Does the AC cord end illuminate?”
User says:
-“Yes” -> go to: charger_not_turning_on
-“No” -> go to: wall_outlet_AC_replacement
== wall_outlet_AC_replacement ==
Bot says:
-“ Check to see if the wall outlet is working. If the wall outlet is working replace the Ac
cord.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== charger_not_turning_on ==
Bot says:
-“This indicates the charger is not turning on. Let’s determine why it will not turn on.”
-“ Check the 11024-IEC Receptacle for continuity.”
User says:
-“No continuity” -> go to: replace_11024_receptacle
-“Yes continuity” -> go to: measure_the_voltage
== replace_11024_receptacle ==
Bot says:
“Replace the 11024-Receptacle.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== measure_the_voltage ==
Bot says:
-“If you have AGM batteries, measure the voltage on both batteries in series. They must
have a minimum combined voltage of 16 volts. If you have a single lithium battery, it must
have a minimum voltage of 21 volts.”
User says:
- “Batteries under voltage” -> go to: replace_batteries
-“Batteries have minimum required voltage” -> go to: check_circuit_breaker
== replace_batteries ==
Bot says:
“Replace the battery/batteries.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== check_circuit_breaker ==
Bot says:
-“ Check the continuity of circuit breaker.”
User says:
-“Yes continuity” -> go to: Dc_wiring_connections
-“No continuity”-> go to: replace_circuit_breaker
== replace_circuit_breaker ==
Bot says:
-“Replace the 12038-Circuit Breaker.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== DC_wiring_connections ==
Bot says:
-“Check to make sure the Dc wiring connections from the charger are securely connected
to the controller.”
User says:
-“The Dc wiring harness is bad” -> go to: replace_harness
-“The Dc wiring is good” -> go to: replace_battery_charger
== replace_harness ==
Bot says:
-“Replace the 7852.10-Dc Cable Harness if the battery charger has a removable Dc cable.
If the Dc cable is hard-wired into the charger, you must replace the battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_battery_charger ==
Bot says:
-“The battery charger needs to be replaced.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== Step_For_VS_wont_move ==
Bot says:
-“Does the battery display or diagnostic code window on the throttle enclosure illuminate
when the ValueShopper is turned on?”
User says:
-“Yes” -> go to: numeral_diagnostic_window
-“No” -> go to: test_battery_voltage
== numeral_diagnostic_window ==
Bot says:
-“Is there a numeral illuminated in the diagnostic window?”
User says:
-“Yes” -> go to: diagnose_code_guide
-“No” -> go to: sit_on_VS_seat
== diagnose_code_guide ==
Bot says:
-“This indicates the motor controller has detected a diagnostic issue. Use the Amigo
Diagnostic Code Guide to review the next steps to take to replace the component causing
the diagnostic code.”
go to: end_conversation
== sit_on_VS_seat ==
Bot says:
-“There must be a rider activating the safety switch in the seat. Sit in the seat and make
sure the switch has been depressed. Does the ValueShopper now move?”
User says:
-“Yes” -> go to: problem_resolved
-“No” -> go to: disconnect_seat_switch_wires
== problem_resolved ==
Bot says:
“Your problem has been resolved.” -> go to: end_conversation
== disconnect_seat_switch_wires ==
Bot says:
-“Disconnect the seat switch wires from the seat switch. Jumper across the two-seat
switch wires you just disconnected to complete the circuit. Does the ValueShopper move
now when the throttle lever is operated?”
User says:
-“Yes” -> go to: replace_seat_switch
-“No” -> go to: replace_wire_harness
== replace_seat_switch ==
Bot says:
-“You need to replace the seat switch.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_wire_harness==
Bot says:
-“You need to replace the 10947-18 Pin Wire Harness.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== test_battery_voltage ==
Bot says:
-“Remove the seat assembly and rear cover. Test the battery voltage at the controller. Is the
battery voltage greater than 21 volts?”
User says:
-“Yes” -> go to: check_wiring_connections
-“No” -> go to: recharge_battery_or_replace
== recharge_battery_or_replace ==
Bot says:
-“Recharge the battery/batteries and allow them to go through a completed charge cycle. If
the cart still has no power replace the 12168.20-Battery (Lithium) or 8967-Batteries (AGM
Type).”
User says:
-“I need to order new batteries.” -> go to: order_parts
go to: end_conversation
== check_wiring_connections ==
Bot says:
-“Check to ensure all wiring connections from the handle enclosure and controller are
securely connected. Measure the battery voltage at the controller; it should match the
battery voltage measured at the battery/batteries.
-“Are the wires secure and battery at the controller? Does the voltage at the controller
battery/batteries match the voltage at the battery/batteries?
User says:
-“Yes” -> go to: check_label_motor_controller
-“No” -> go to: check_continuity_thru_breaker
== check_continuity_thru_breaker ==
Bot says:
-“Check to make sure there is continuity through the 12038-Circuit Breaker. Is there
continuity?”
User says:
-“Yes” -> go to: replace_battery_wire
-“No” -> go to: replace_circuit_breaker
== replace_circuit_breaker ==
Bot says:
-“Replace the 12038-Circiut Breaker.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_battery_wire ==
Bot says:
-“Replace the Battery wire asms with a 9853-Battery Wire Disconnect kit.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== check_label_motor_controller ==
Bot says:
-“Check the part number label on the motor controller. Does it match the type of handle
the cart has (LED or LCD)?”
User says:
-“Yes” -> go to: substitute_parts
-“No” -> go to: replace_motor_controller
== substitute_parts ==
Bot says:
-“Substitute the following parts in order until the faulty part is found:
1. Handle cable
2. Throttle assembly
3. Controller
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_motor_controller ==
Bot says:
-“Replace the motor controller with the correct version.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation