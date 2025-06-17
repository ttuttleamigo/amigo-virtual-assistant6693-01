
import { ConversationFlow } from './conversationFlow';

export const contactAgentFlow: ConversationFlow = {
  contact_agent: {
    id: 'contact_agent',
    botMessage: [
      "Looks like you need to connect to factory service agent.",
      "Would you rather receive a phone call or an email?"
    ],
    userOptions: [
      { text: "Phone call", nextStep: "phone_call" },
      { text: "Email", nextStep: "send_email" }
    ]
  },

  phone_call: {
    id: 'phone_call',
    botMessage: [
      "OK. Amigo agents are available by phone Monday through Friday from 7:30 a.m. to 5:30 p.m. EST and can contact you within the next business day.",
      "Is this convenient for you, or would you prefer to call customer support?"
    ],
    userOptions: [
      { text: "Please call me", nextStep: "enter_contact_info" },
      { text: "I will call", nextStep: "call_phone_number" }
    ]
  },

  enter_contact_info: {
    id: 'enter_contact_info',
    botMessage: "Please enter your name and phone number. An agent will contact you within the next business day.",
    userOptions: [],
    allowTextInput: true
  },

  contact_info_received: {
    id: 'contact_info_received',
    botMessage: [
      "Thank you for choosing Amigo for your mobility needs!"
    ],
    userOptions: [
      { text: "Continue", nextStep: "end_conversation" }
    ]
  },

  call_phone_number: {
    id: 'call_phone_number',
    botMessage: "OK. Please call 1-800-248-9131 on Monday through Friday between 7:30 a.m. and 5:30 p.m. EST, and an agent will be happy to assist you.",
    userOptions: [
      { text: "Continue", nextStep: "end_conversation" }
    ]
  },

  send_email: {
    id: 'send_email',
    botMessage: [
      "OK. Please email service@myamigo.com with your name, company, phone number, and a brief description of what you need help with. An agent will respond within the next business day.",
      "Thank you for choosing Amigo for your mobility needs!"
    ],
    userOptions: [
      { text: "Continue", nextStep: "end_conversation" }
    ]
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
