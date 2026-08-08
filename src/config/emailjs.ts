// EmailJS Configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/

/** Inbound address for website inquiries (homepage + forms). */
export const OPERATIONS_INBOX = "operations@airotix.com";

export const EMAILJS_CONFIG = {
  // EmailJS Service ID - Found in Email Services section
  SERVICE_ID: "service_suatgh9",
  
  // EmailJS Template ID - Found in Email Templates section
  // Contact form template - Update this with your template ID from EmailJS dashboard
  // To set up a template:
  // 1. Go to Email Templates in your EmailJS dashboard
  // 2. Create a new template or edit existing one
  // 3. Use these variables in your template: {{from_name}}, {{from_email}}, {{message}}, {{to_name}}, {{reply_to}}
  // 4. Copy the template ID and paste it here
  CONTACT_TEMPLATE_ID: "template_bsd5r1k",
  
  // Public Key - Found in Account > General Settings > API Keys
  // Update this with your public key from EmailJS dashboard if needed
  PUBLIC_KEY: "MMoBia4z1AogE_V3S"
};

// Template parameter types
// These are the variables sent to your EmailJS template.
// Match your template: e.g. {{from_name}}, {{from_email}}, {{message}}, {{to_name}}, {{reply_to}}, {{to_email}}, {{subject}}
// In EmailJS: set "To Email" to {{to_email}} (or statically to operations@airotix.com) and Reply-To to {{reply_to}} so ops can reply to the visitor.
export interface ContactFormParams {
  from_name: string;
  /** Visitor work email — use in template body and as {{reply_to}} so replies go to them. */
  from_email: string;
  message: string;
  to_name: string;
  reply_to: string;
  /** Dynamic recipient (configure template "To" field to use this variable if supported). */
  to_email?: string;
  subject?: string;
}

export interface SubscriptionParams {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
  reply_to?: string;
}

