Conversation: Vista troubleshooting
Start at: Greeting
== Greeting ==
Bot says:
- "Hello, this is the bot."
- " What seems to be the issue?”
User can choose:
- "My Vista turns on, but the charger will not turn on or the batteries do not hold a charge" ->
go to: Step_For_Vista_battery_troubleshooting
- "My Vista will not move" -> go to: Step_For_Vista_wont_move
-“I have a different customer service need.” -> go to: contact_agent
== Step_For_Vista_battery_troubleshooting ==
Bot says:
-“Connect the AC cord to the wall outlet.”
-“For the throttle enclosure LED battery gage: does the battery gage on the throttle
enclosure flash for 10-30 seconds before going solid?”
-“ For the throttle enclosure LCD throttle display: does the display show a green rectangle
at the bottom with the text "CHARGING"?”
User says:
-“Yes” -> go to: charge_batteries_measure_voltage
-“No” -> go to: ac_cord_illuminate
== charge_batteries_measure_voltage ==
Bot says:
-“With the Ac cord disconnected from the wall outlet, measure and record the voltage on
the batteries.”
-“Now connect the Ac cord into the wall outlet and let the batteries charge for two
minutes.”
-“Now measure the battery voltage, has it increased to a minimum of 25 volts?”
User says:
-“Yes” -> go to: charger_fine_replace_batteries
-“No” -> go to: replace_charger
== charger_fine_replace_batteries ==
Bot says:
-“The charger is operating properly, but the battery/batteries have reached a state where
they can no longer hold a charge and should be replaced.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_charger ==
Bot says:
-“The battery charger is not outputting the proper Dc voltage, so you need to replace the
battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== ac_cord_illuminate ==
Bot says:
-“Does the Ac cord end illuminate?”
User says:
-“Yes” -> go to: charger_not_turning_on
-“No” -> go to: wall_outlet_replace_cord
== wall_outlet_replace_cord ==
Bot says:
-“Check to see if the wall outlet is working. If the wall outlet is working, you need to replace
the AC cord.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== charger_not_turning_on ==
Bot says:
-“This indicates the charger is not turning on. Let’s determine why it will not turn on.”
-“Check the 11024-IEC Receptacle for continuity.”
User says:
-“Yes continuity” -> go to: check_battery_voltage
-“No continuity” -> go to: replace_batteries
== replace_batteries ==
Bot says:
-“You need to replace the battery/batteries.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== check_battery_voltage ==
Bot says:
-“If you have AGM batteries, measure the voltage on both batteries in the series; they must
have a minimum combined voltage of 16 volts. If you have a single lithium battery it must
have a minimum voltage of 21 volts.”
User says:
-“Batteries are under voltage” -> go to: replace_batteries
-“Batteries have minimum required voltage” -> go to: check_circuit_breaker
== replace_batteries ==
Bot says:
-“You need to replace the battery/batteries.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== check_circuit_breaker ==
Bot says:
-“Check if there is continuity of circuit breaker.”
User says:
-“Yes continuity” -> go to: check_dc_wiring
-“No continuity” -> go to: replace_breaker
== replace_breaker ==
Bot says:
-“You need to replace the 12038-Circuit Breaker.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== check_dc_wiring ==
Bot says:
-“Check to make sure the Dc wiring connections from the charger are securely connected
to the controller.”
User says:
-“Dc wiring harness is bad” -> go to: replace_harness
-“Dc wiring is good” -> go to: replace_battery_charger
== replace_harness ==
Bot says:
-“You need to replace the 7852.10-Dc Cable Harness if the battery charger has a
removable Dc cable. If the Dc cable is hard-wired into the charger, you must replace the
battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_battery_charger ==
Bot says:
-“You need to replace the battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== Step_For_Vista_wont_move ==
Bot says:
-“Does the battery display or diagnostic code window on the throttle enclosure illuminate
when the key is turned on?”
User says:
-“Yes” -> go to: battery_display_flashing
-“No” -> go to: test_battery_voltage
== battery_display_flashing ==
Bot says:
-“Is the battery display flashing?”
User says:
-“Yes” -> go to: numeral_2_illuminate
-“No” -> go to: make_sure_sitting_try_again
== numeral_2_illuminate ==
Bot says:
-“Is the numeral "2" illuminated in the diagnostic window?”
User says:
-“Yes” -> go to: brake_circuit_open
-“No” -> go to: diagnostic_code_guide
== diagnostic_code_guide ==
Bot says:
-“If the numeral is something other than "2," refer to the diagnostic code guide and use
those troubleshooting steps to determine the root cause of the diagnostic code.”
Go to: end_conversation
== brake_circuit_open ==
Bot says:
-“This indicates the brake circuit is open.”
-“Turn the key off and check to make sure the freewheel lever in the rear of the Vista is in
the Normal position.”
-“Turn the key back on, and if the "2" code is still illuminated, check the continuity on the
brake wiring. If the wires are good replace the 11087-Brake.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== make_sure_sitting_try_again ==
Bot says:
-“Make sure you are properly seated and depress the seat switch under the seat cover.
Does the Vista now run?”
User says:
-“Yes” -> go to: problem_resolved
-“No” -> go to: throttle_lever_activated
== problem_resolved ==
Bot says:
-“Your problem has been resolved.”
Go to: end_conversation
== throttle_lever_activated ==
Bot says:
-“Disconnect the two wires from the seat switch terminals coming off 10947-Wire asm.
Create a short circuit across the two female terminals you just disconnected.”
-“Does the Vista now run if the throttle lever is activated?”
User says:
-“Yes” -> go to: replace_wire_assembly
-“No” -> go to: swap_parts
== replace_wire_assembly ==
Bot says:
-“You need to replace the 10947-Wire Assembly.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== swap_parts ==
Bot says:
-“This means one of four components is faulty. Swap them in the following order:
1. Replace the 8969-Handle Cable
2. Replace the enclosure matching the current style on the Vista
3. Replace the motor controller matching the current style on the Vista
4. If none of the previous three parts resolved the issue, then replace the 11042-Drive
-“Do you need to order parts?”
5. User says:
6. -“Yes” -> go to: order_parts
7. -“No” -> go to: end_conversation
== test_battery_voltage ==
Bot says:
“Remove the 7/16" bolt underneath the front of the seat that runs between the seat release
levers. Test the battery voltage at the controller.”
-“Is the battery voltage greater than 21 volts?”
User says:
-“Yes” -> go to: check_wiring
-“No” -> go to: recharge_batteries_replace_batteries
== recharge_batteries_replace_batteries ==
Bot says:
-“Recharge the battery/batteries and allow them to go through a completed charge cycle. If
cart still has no power replace the batteries.”
-“Do you need to order parts?”
1. User says:
2. -“Yes” -> go to: order_parts
3. -“No” -> go to: end_conversation
== check_wiring ==
Bot says:
-“Check to ensure all wiring connections from the handle enclosure, breakout board, and
controller are securely connected.”
-“Measure the battery voltage at the controller; it should match the battery voltage
measured at the battery/batteries. Are the wires secure and battery at the controller? Does
voltage at the battery/batteries at the controller match the voltage at the battery?”
User says:
-“Yes” -> go to: substitute_parts
-“No” -> go to: check_continuity
== substitute_parts ==
Bot says:
-“Substitute the following parts in order until the faulty part is found:
1. 8969-Handle cable
2. Enclosure
3. Controller
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== check_continuity ==
Bot says:
-“Check to make sure there is continuity through the 12038-Circuit Breaker. Is there
continuity?”
User says:
-“Yes” -> go to: replace_battery_harness
-“No” -> go to: replace_breaker
== replace_breaker ==
Bot says:
-“You need to replace the 12038-Circiut Breaker.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
== replace_battery_harness ==
Bot says:
“You need to replace the battery harnesses with a 9853-Battery Harness Kit.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation