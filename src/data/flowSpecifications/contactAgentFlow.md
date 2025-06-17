Conversation: Contact agent

Start at: contact_agent

== contact_agent ==
Bot says:
-“Looks like you need to connect to factory service agent.”
-“Would you rather receive a phone call or an email?”
User can choose:
-“Phone call” -> go to: phone_call
-“Email” -> go to: send_email

== phone_call ==
Bot says:
-“OK. Amigo agents are available by phone Monday through Friday from 7:30 a.m. to 5:30 p.m. EST and can contact you within the next business day.”
-“ Is this convenient for you, or would you prefer to call customer support?”
User can choose:
“Please call me” -> go to: enter_contact_info
“I will call” -> go to: call_phone_number

== enter_contact_info ==
Bot says:
-“Please enter your name and phone number. An agent will contact you within the next business day.”
User says:
-“[Contact information]” -> go to: EMILY’S NOTE: I DON’T KNOW WHERE THIS IS SUPPOSED TO GO. YOU WILL NEED TO WRITE THIS PORTION YOURSELF.

== [EMILY’S NOTE: I DON’T KNOW WHERE THIS IS SUPPOSED TO GO. YOU WILL NEED TO WRITE THIS PORTION YOURSELF.] ==
Bot says:
-“ Thank you for choosing Amigo for your mobility needs!”
Go to: end_conversation

== call_phone_number ==
Bot says:
-“OK. Please call 1-800-248-9131 on Monday through Friday between 7:30 a.m. and 5:30 p.m. EST, and an agent will be happy to assist you.  
Go to: end_conversation

== send_email ==
Bot says:
-“ OK. Please email service@myamigo.com with your name, company, phone number, and a brief description of what you need help with. An agent will respond within the next business day.”
-“ Thank you for choosing Amigo for your mobility needs!”
Go to: end_conversation