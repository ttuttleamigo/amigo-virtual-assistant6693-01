Conversation: General Amigo troubleshooting
Start at: Greeting
== Greeting ==
Bot says:
- "Hello, this is the bot."
- " What seems to be the issue?”
User can choose:
- "My Amigo turns on, but the charger will not turn on or the batteries do not hold a charge" -
> go to: Step_For_GenAmigo_battery_troubleshooting
- "My Amigo will not move" -> go to: Step_For_GenAmigo_wont_move
-“I have a different customer service need.” -> go to: contact_agent
== Step_For_GenAmigo_battery_troubleshooting ==
Bot says:
-“Connect the AC cord to the wall outlet. Does the battery gauge on the throttle enclosure
flash for 10-30 seconds before going solid?”
User says:
-“Yes” -> go to: measure_record_voltage
-“No” -> go to: check_wall_outlet
== check_wall_outlet ==
Bot says:
-“Plug a radio, lamp, etc. into the wall outlet. Is it working?”
User can choose:
-“Yes” -> go to: measure_voltage_ac_side
-“Find a wall outlet that works and repeat the process.” -> go to: try_again
== try_again ==
Bot says:
-“Plug a radio, lamp, etc. into a different wall outlet. Is it working?”
User can choose:
-“Yes” -> go to: measure_voltage_ac_side
-“If the wall outlet is still not working, our service team may be able to help with your Amigo
troubleshooting.” -> go to: contact_agent
== measure_voltage_ac_side ==
Bot says:
-“Remove the seat and rear cover. Disconnect the cord reel Ac plug from the battery
charger and measure the voltage coming out of the Ac side of the cord reel.”
-“Does it measure at 110-120 volts?”
User says:
-“Yes” -> go to: replace_dc_charger
-“No” -> go to: replace_cord_reel
== replace_cord_reel ==
Bot says:
-“You need to replace the cord reel.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== replace_dc_charger ==
Bot says:
-“Replace the Dc cable that connects the battery charger to the motor controller. Does the
battery gauge flash now when the cord reel is connected to the wall outlet?”
User says:
-“Yes” -> go to: charge_batteries_or_replace
-“No” -> go to: replace_battery_charger
== charge_batteries_or_replace ==
Bot says:
-“Allow the batteries to fully charge. If the Amigo still does not hold a charge after an
extended charge cycle, replace the batteries.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== replace_battery_charger ==
Bot says:
-“You need to replace the battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== measure_record_voltage ==
Bot says:
-“With the Ac cord disconnected from the wall outlet, measure and record the voltage on
the batteries.”
-“Now connect the Ac cord into the wall outlet and let the batteries charge for two minutes.
Then measure the battery voltage. Has it increased to a minimum of 25 volts?”
User says:
-“Yes” -> go to: replace_batteries
-“No” -> go to: replace_battery_charger
== replace_batteries ==
Bot says:
-“The batteries have reached a point where they can no longer hold a charge and need to
be replaced.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== replace_battery_charger ==
Bot says:
-“The battery charger is not outputting the proper Dc voltage, so you need to replace the
battery charger.
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== Step_For_GenAmigo_wont_move ==
Bot says:
-“Does the battery display or diagnostic code window on the throttle enclosure illuminate
when the Amigo is turned on?”
User says:
-“Yes” -> go to: number_illuminated
-“No” -> go to: measure_battery_voltage
== measure_battery_voltage ==
Bot says:
-“When measuring the battery voltage in series, do they have a minimum combined voltage
of 16 volts?”
User says:
-“Yes” -> go to: one_of_three_issues
-“No” -> go to: charge_batteries_try_again
== charge_batteries_try_again ==
Bot says:
-“Your batteries do not have enough charge in them to power the Amigo. Plug the AC cord
in, fully charge the batteries, and then see if the Amigo will run. If the Amigo does not turn
on after charging, the batteries need to be replaced.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== one_of_three_issues ==
Bot says:
-“One of three components is not allowing the Amigo to turn on. Replace the parts in this
order to determine which part is at fault:
1. Handle cable
2. Throttle enclosure assembly
3. Motor controller
-“Do you need to order parts?”
4. User says:
5. -“Yes” -> go to order_parts
6. -“No” -> go to: end_conversation
== number_illuminated ==
Bot says:
-“Is there a number illuminated in the diagnostic window?”
User says:
-“Yes” -> go to: diagnostic_code
-“No” -> go to: battery_gage_flashing
== battery_gage_flashing ==
Bot says:
-“Is the battery gage on “empty” and flashing?”
User says:
-“Yes” -> go to: charge_try_again
-“No” -> go to: motor_controller_signal
== charge_try_again ==
Bot says:
-“Your batteries may not have enough charge in them to power the Amigo. Plug the AC cord
in, fully charge the batteries, then see if the Amigo will run”
User can choose:
-“I need further assistance” -> go to: contact_agent
== motor_controller_signal ==
Bot says:
-“The motor controller may not be receiving the correct signal. Replace the handle cable
first. If that does not resolve the problem, replace the throttle enclosure assembly.”
-“Do you need to order parts?”
1. User says:
2. -“Yes” -> go to order_parts
3. -“No” -> go to: end_conversation
== diagnostic_code ==
Bot says:
-“Is the Diagnostic Code a "1"?”
User says:
-“Yes” -> go to: em_brake_circuit
-“No” -> go to: code_2
== em_brake_circuit ==
Bot says:
-“The "1" code indicates the EM Brake circuit has a short circuit.”
-“Check brake wires and connections for damage or looseness. If they are tight, disconnect
brake wires to controller and cycle key.”
-“If the code changes to a "2” replace the brake. The last option is to replace the motor
controller.
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_2 ==
Bot says:
-“ Is the Diagnostic Code a "2"?”
User says:
-“Yes” -> go to: em_brake_open
-“No” -> go to: code_3
== em_brake_open ==
Bot says:
-“The EM Brake circuit is open. Either the windings or connections are open or the EM brake
release lever is in “freewheeling position." “
-“Ensure the EM brake lever is in drive position, if it is, check brake wires and connections
for damage or looseness. If they are tight, swap brake and motor leads on the motor
controller.”
-“If code changes to"4," change the brake. The last option is to change the motor
controller.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_3 ==
Bot says:
-“ Is the Diagnostic Code a "3"?”
User says:
-“Yes” -> go to: motor_circuit
-“No” -> go to: code_4
== motor_circuit ==
Bot says:
-“The "3" code indicates motor circuit has a short circuit.”
-“Check motor wiring connections. If they are good, swap the brake and motor leads on the
motor controller.”
-“If the code changes to "1," change the motor. The last option is to change the motor
controller.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_4 ==
Bot says:
-“ Is the Diagnostic Code a "4"?”
User says:
-“Yes” -> go to: motor_circuit_open
-“No” -> go to: code_5
== motor_circuit_open ==
Bot says:
-“The "4" code indicates the motor circuit is open.”
-“Check the motor wire connections, if they appear to be good, swap the motor and brake
leads at the motor controller.”
-“If code changes to "2" replace the motor. If the code stays a "4" the last option is the
motor controller.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_5 ==
Bot says:
-“ Is the Diagnostic Code a "5"?”
User says:
-“Yes” -> go to: motor_controller_fault
-“No” -> go to: code_6
== motor_controller_fault ==
Bot says:
-“ The "5" code indicates the motor controller is detecting a fault in the throttle circuit.”
-“Check to ensure the handle cable is securely connected to the receptacle under the
throttle enclosure. If the handle cable is securely connected to the throttle enclosure,
check to make sure the handle cable is in good shape with no kinks or cuts the entire
length of the cable back to the motor controller.”
-“Check to make the throttle lever moves freely and returns to the neutral position. The last
option is to replace the throttle enclosure.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_6 ==
Bot says:
-“ Is the Diagnostic Code a "6"?”
User says:
-“Yes” -> go to: over_temp
-“No” -> go to: code_7
== over_temp ==
Bot says:
-“The "6" code indicates an over-temperature condition.”
-“Allow the Amigo to sit idle for 15 minutes and then restart to see if the code disappears. If
the code is still there, replace the motor controller.
-“If the code disappears, start driving the Amigo but check to make sure the brake is
releasing properly so it is not causing excessive amperage draw. If the brake is not releasing
you should be able to hear a sound near the transaxle that sounds like something is
dragging.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_7 ==
Bot says:
-“ Is the Diagnostic Code a "8"?”
User says:
-“Yes” -> go to: battery_charger_cycle
-“No” -> go to: code_8
== battery_charger_cycle ==
Bot says:
-“The "7" code will only appear after an extended period of charging. It indicates the battery
charger is not dropping into float mode to end the battery charge cycle.”
-“Replace the Dc charger cable, if the code still appears replace the battery charger.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation
== code_8 ==
Bot says:
-“ Is the Diagnostic Code a "8"?”
User says:
-“Yes” -> go to: motor_controller_3_faults
== motor_controller_3_faults ==
Bot says:
-“ The "8" code indicates the motor controller detected one of three faults during start-up.”
“First, check the batteries to ensure they are fully charged, and load test them. If the
batteries are ok, replace the motor controller.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to order_parts
-“No” -> go to: end_conversation