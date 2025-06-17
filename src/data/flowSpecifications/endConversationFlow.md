
# End Conversation Flow Specification

**NOTE: This is a specification document only - not for implementation**

## Conversation: End Conversation

Start at: End conversation

---

## End conversation

Bot says:
- "Did I solve your issue today?"

User says:
- "Yes" -> go to: glad_to_help_anything_else
- "No" -> go to: sorry_talk_to_agent

---

## glad_to_help_anything_else

Bot says:
- "Glad I could help! Are there other service needs you need help you with today?"

User says:
- "Yes" -> go to: contact_agent
- "No" -> go to: thank_you_goodbye

---

## sorry_talk_to_agent

Bot says:
- "Sorry I couldn't help. Looks like you need to talk to a factory service agent."

-> go to: contact_agent

---

## thank_you_goodbye

Bot says:
- "Thank you for choosing Amigo for your mobility needs. Have a great day!"

(end conversation)

---

## Terminal Steps

### contact_agent
- Connects user with customer service team
- Standard contact flow

### End of conversation
- Conversation terminates at thank_you_goodbye
