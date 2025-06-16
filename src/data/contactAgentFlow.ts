
import { ConversationFlow } from './conversationFlow';

export const contactAgentFlow: ConversationFlow = {
  contact_agent: {
    botMessage: [
      "I'd be happy to connect you with one of our factory service agents who can provide personalized assistance.",
      "Would you prefer to receive a phone call or an email?"
    ],
    userOptions: [
      { text: "Phone call", nextStep: "phone_call" },
      { text: "Email", nextStep: "send_email" }
    ]
  },

  phone_call: {
    botMessage: [
      "Perfect! Our friendly Amigo service agents are available by phone Monday through Friday from 7:30 a.m. to 5:30 p.m. EST and can contact you within the next business day.",
      "Is this convenient for you, or would you prefer to call customer support directly?"
    ],
    userOptions: [
      { text: "Please call me", nextStep: "enter_contact_info" },
      { text: "I will call", nextStep: "call_phone_number" }
    ]
  },

  enter_contact_info: {
    botMessage: "Great! Please provide your name and phone number, and one of our service agents will contact you within the next business day.",
    userOptions: [
      { text: "Submit contact information", nextStep: "contact_info_received" }
    ]
  },

  contact_info_received: {
    botMessage: [
      "Thank you! We've received your information and one of our service agents will be in touch within the next business day to help with your Amigo cart.",
      "Thank you for choosing Amigo for your mobility needs!"
    ],
    userOptions: []
  },

  call_phone_number: {
    botMessage: "Excellent! Please call 1-800-248-9131 Monday through Friday between 7:30 a.m. and 5:30 p.m. EST, and one of our knowledgeable agents will be happy to assist you with your Amigo cart.",
    userOptions: []
  },

  send_email: {
    botMessage: [
      "That works perfectly! Please email service@myamigo.com with your name, company, phone number, and a brief description of what you need help with. One of our service agents will respond within the next business day.",
      "Thank you for choosing Amigo for your mobility needs!"
    ],
    userOptions: []
  }
};
