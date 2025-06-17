Conversation: Max CR troubleshooting

Start at: Greeting

== Greeting ==
Bot says: 
- "Hello, this is the bot." 
- " What seems to be the issue?”
User can choose:
- "My Max CR turns on, but the charger will not turn on or the batteries do not hold a charge." -> go to: Step_For_ Max_CR_battery_troubleshooting
- "My Max CR will not move" -> go to: Step_For_Max_CR_wont_move
- "My Max CR remote won’t pair" -> go to: Step_For_Max_CR_remote_pairing
-“I have a different customer service need.” -> go to: contact_agent

== Step_For_ Max_CR_battery_troubleshooting == 
Bot says: 
- "First, connect the AC cord to the wall outlet. Does the battery display on the throttle enclosure flash for 10-30 seconds before going solid?”
User says:
- “Yes” -> go to: Measure_battery_voltage
- “No” -> go to: AC_cord_illumination

== Measure_battery_voltage ==
Bot says:
- “Disconnect the AC cord from the wall outlet and measure and record the voltage on the battery. Then connect the AC cord into the wall outlet and let the batteries charge for two minutes. After they have charged, measure the battery voltage. Has it increased to a minimum of 25 volts?
User says:
- “Yes” -> go to: Replace_battery
- “No” -> go to: Replace_battery_charger

== Replace_battery_charger ==
Bot says:
-“The battery charger is not outputting the proper Dc voltage, and it will need to be replaced. Replace the battery charger with P/N 12499.22-Charger for AGM or P/N 12499.23-Charger for Lithium.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: go to: end_conversation

== Replace_battery ==
Bot says:
- “The charger is operating properly. The battery/batteries have reached a state where they can no longer hold a charge and should be replaced.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== AC_cord_illumination ==
Bot says:
-“Does the AC cord end illuminate?”
User says:
-“Yes” -> go to: charger_troubleshooting
-“No” -> go to: wall_outlet

== Wall_outlet ==
Bot says:
-“Check to see if the wall outlet is working. If the wall outlet is working, replace the AC cord.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== charger_troubleshooting ==
Bot says:
-“This indicates the charger is not turning on. Use the following steps to determine why it will not turn on.”
-“Check the 13084-IEC Receptacle for continuity.”
User says:
-“Yes continuity” -> go to: measure_battery_voltage
-“No continuity” -> go to: replace_rececptacle

== replace_receptacle == 
Bot says:
-“You need to replace the 13084-IEC Receptacle.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== measure_battery_voltage ==
Bot says:
-“If you have AGM batteries, measure the voltage on both batteries in the series; they must have a minimum combined voltage of 16-volts. If you have a single lithium battery, it must have a minimum voltage of 21-volts.”
User says:
-“Batteries under voltage” -> go to: replace_fuse
-“Batteries have minimum required voltage” -> go to: remove_fuse_check_continuity

== replace_fuse ==
Bot says:
-“Replace the fuse with a 25A 250V replacement.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== remove_fuse_check_continuity ==
Bot says:
-“Remove the fuse and check continuity.”
User says:
-“Yes continuity” -> go to: replace_battery_charger
-“No continuity” -> go to: replace_fuse
== replace_battery_charger ==
Bot says:
-“Replace the 12499.21-battery charger if the batteries are AGM. Replace the 12499.22-battery charger if battery is lithium.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== replace_fuse ==
Bot says:
-“Replace the fuse with a 25A 250V replacement.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== Step_For_Max_CR_wont_move ==
Bot says: 
-“First, turn the Max CR key on.”
-“Does the battery display or diagnostic code window on the throttle enclosure illuminate when the key is turned on?”
User says:
-“Yes” -> go to: battery_display
-“No” -> go to: test_battery_voltage

== battery_display ==
Bot says:
-“Is the battery display flashing rapidly?”
User says:
-“Yes” -> go to: belly_switch
-“No” -> go to: numeral_2

== belly_switch ==
Bot says:
-“Is the belly switch pushed in? Rotate the switch clockwise a quarter turn to release it. If this does not resolve the problem, check to make sure the 13147.20-Belly Switch asm is connected to the 13059-Breakout PCB.”
-“Did either of these two procedures clear the rapid flashing?
User says:
-“Yes” -> go to: problem_resolved
-“No”-> go to: disconnect_belly_switch

== problem_resolved ==
Bot says:
-“Your problem has been resolved.” 
Go to: end_conversation

== disconnect_belly_switch ==
Bot says:
-“ Disconnect the 13147.20-Belly Switch asm from the 13059-Breakout PCB. Using a wire jumper, jumper across the two pins where you just disconnected the Belly Switch asm.”
-“Did this clear the rapid flashing?”
User says:
-“Yes” -> go to: replace_belly_switch
-“No” -> go to: replace_PCB

== replace_belly_switch ==
Bot says:
-“ Replace the 13147.20-Belly Switch Asm.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== replace_PCB ==
Bot says:
-“ Replace the 13059-Breakout PCB.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== numeral_2 ==
Bot says:
-“Is the numeral “2” illuminated in the diagnostic window?”
User says:
-“Yes” -> go to: brake_circuit
-“No” -> go to: diagnostic_code_guide

== brake_circuit ==
Bot says:
-“This indicates the brake circuit is open. Turn the key off, check to make sure the freewheel lever in front of the Max CR is in the Normal position, and turn the key back on.”
-“ If the "2" code is still illuminated, check the continuity on the brake wiring. If the wires are good, replace the 13077-Brake Wire Harness.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== test_battery_voltage ==
Bot says:
-“ Remove the top to the power box and test the battery voltage at the controller. Is the battery voltage greater than 21 volts?”
User says:
-“Yes” -> go to: wiring_connections
-“No” -> go to: recharge_batteries

== recharge_batteries ==
Bot says:
-“ Recharge the battery/batteries, allowing them to go through a completed charge cycle.”
-“If the cart still has no power, you will need to replace the 12402-Battery (Lithium) or 12947-Batteries (AGM Type).
-“Is there continuity?”
User says:
-“Yes continuity” -> go to: measure_voltage
-“No power” -> replace_battery

== replace_battery ==
Bot says:
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== measure_voltage ==
Bot says:
-“If you have AGM batteries, measure the voltage on both batteries in series; they must have a minimum combined voltage of 16 volts. If you have a single lithium battery it must have a minimum voltage of 21 volts.”
User says:
-“Batteries under voltage” -> go to: replace_batteries
-“Batteries have minimum required voltage” go to: -> check_LEDs

== replace_batteries ==
Bot says:
-“You need to replace the batteries. Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== check_LEDs ==
Bot says:
-“Check the LEDs on the battery charger. They should be either solid red, red & yellow flashing, or green. If they are, the charger is working.”
User says:
-“LEDs illuminate” -> go to: charge_batteries_replace_if_needed
-“No LEDs illuminate on the battery charger or jus the red LED is flashing” -> go to: remove_fuse_check_continuity

== charge_batteries_replace_if_needed ==
Bot says:
-“Allow the batteries to fully charge. If they do not have enough capacity to run the cart for 8 hours, replace the batteries.”
go to: end_conversation

 == remove_fuse_check_continuity ==
Bot says:
-“Remove the fuse and check continuity.”
User says:
-“No continuity” -> go to: replace_fuse
-“Yes continuity” -> go to: replace_battery_charger

== replace_fuse ==
Bot says:
-“ Replace the fuse with a 25A 250V replacement.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== replace_battery_charger ==
Bot says:
-“Replace the 12499.21-battery charger if the batteries are AGM. Replace the 12499.22-battery charger if the battery is lithium.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== wiring_connections ==
Bot says:
-“Check to ensure all wiring connections from the handle enclosure, breakout board, and controller are securely connected. Measure the battery voltage at the controller. It should match the battery voltage measured at the battery/battiers.”
-“Are wires secure and battery at the controller? Does voltage at the battery/batteries match the voltage at the battery?”
User says:
-“Yes” -> go to: substitute_parts
-“No” -> go to: check_circuit_breaker_continuity

== substitute_parts ==
Bot says:
-“Substitute the following parts in order until the faulty part is found:
1.	8969-Handle cable.
2.	8223.25-Throttle Asm.
3.	12933CR-Controller.
-“Do you need to order parts?”
4.	User says:
5.	-“Yes” -> go to: Order_parts
6.	-“No” -> go to: end_conversation

== check_circuit_breaker_continuity ==
Bot says:
-“Check to make sure there is continuity through the 12661-Circuit Breaker. Is there continuity?”
User says:
-“Yes” -> go to: replace_harness_battery_harness
-“No” -> go to: replace_circuit_breaker

== replace_harness_battery_harness ==
Bot says:
-“Replace the 11190-Harness (2 pieces) and the 13093-Battery Harness.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== replace_circuit_breaker ==
Bot says:
- “Replace the 12661-Circiut Breaker.”
-“Do you need to order parts?”
User says:
-“Yes” -> go to: Order_parts
-“No” -> go to: end_conversation

== Step_For_Max_CR_remote_pairing ==
Bot says:
-“Attempt the pairing process. Turn the Max CR and the remote on. Press the "STOP" button on the remote for 10 seconds. The power button on the remote will flash blue. Press and hold the pairing button on the Max CR until the horn sounds.”
-“Does the Max CR now respond to the remote?”
User says:
-“Yes” -> go to: try_3_steps
-“No” -> go to: press_power_button

== try_3_steps ==
Bot says:
-“If the remote only loses connection with the Max CR intermittently there are 3 steps to try:
1.	Attempt to pair the remote in the exact location where the connection is lost. The remote is designed to search for the clearest communication channel if there is interference from other devices. 
2.	If the remote works well when you are close to the Max CR but consistently loses connectivity if you get to the end of the line of carts, replace the 13147.20-Antenna. 
3.	If the Max CR will not respond when only pushing specific buttons on the remote, the membrane on the remote does not contact properly and needs to be replaced.
User can choose:
-“I need to replace the antenna and need to order parts” -> go to: order_parts
-“I need to replace the remote membrane and need to order parts” -> go to: order_parts
-“I need to replace a part, but I don’t need to order anything” -> go to: end_conversation
- “None of these options” -> go to: contact_agent

== press_power_button ==
Bot says:
-“OK. Press the power button on the remote. Does it illuminate green?”
User says:
- “No” -> go to: replace_AA_batteries
-“Yes” -> go to: == inspect_wiring ==

== inspect_wiring ==
Bot says:
-“Inspect all the wiring running between the receiver board and the breakout board. If the wiring is good, first replace the 12344-recevier board, if that doesn't resolve the problem replace the 13059-breakout board.”
User says:
“I need to order parts” -> go to: order_parts

== replace_AA_batteries ==
Bot says:
-“ Replace the batteries in the remote with four new lithium AA batteries or recharge the batteries if you have a remote with the rechargeable option.”
-“Press the remote power button, does it illuminate green?”
User says:
-“Yes” -> go to: Step_For_Max_CR_remote_pairing
-“No” -> go to: replace_remote

== replace_remote ==
Bot says:
-“You need to replace the remote. Do you want to order a new one?”
User says:
-“Yes” -> go to: order_parts
-“No” -> go to: end_conversation
