
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Mail, User, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, OPERATIONS_INBOX, type ContactFormParams } from '@/config/emailjs';

// Enhanced schema with robust validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\s'-]+$/, 'Please enter a valid name'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  honeypot: z.string().max(0, 'Bot detected'), // Honeypot field must be empty
  timestamp: z.number() // To prevent automated quick submissions
});

type FormValues = z.infer<typeof formSchema>;

type EmailJsError = {
  status?: number;
  text?: string;
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState<number>(Date.now()); // Track when form was opened
  const [submitAttempts, setSubmitAttempts] = useState(0); // Track submission attempts for rate limiting
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0); // Track last submission time
  
  const { toast } = useToast();
  
  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: '',
      timestamp: formStartTime
    }
  });
  
  // Get character count for message field
  const messageValue = form.watch('message');
  const messageCharCount = messageValue?.length || 0;

  const onSubmit = async (data: FormValues) => {
    // Rate limiting: Prevent too many failed submissions in a short time
    const now = Date.now();
    const RATE_LIMIT_WINDOW = 60000; // 1 minute
    const MAX_SUBMISSIONS = 3;
    
    // Reset rate limiting if enough time has passed
    if (lastSubmitTime > 0) {
      const timeSinceLastSubmit = now - lastSubmitTime;
      if (timeSinceLastSubmit >= RATE_LIMIT_WINDOW) {
        setSubmitAttempts(0);
        setLastSubmitTime(0);
      }
    }
    
    // Check rate limiting before setting submitting state
    if (lastSubmitTime > 0) {
      const timeSinceLastSubmit = now - lastSubmitTime;
      if (timeSinceLastSubmit < RATE_LIMIT_WINDOW && submitAttempts >= MAX_SUBMISSIONS) {
        const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - timeSinceLastSubmit) / 1000);
        toast({
          title: "Too many requests",
          description: `Please wait ${remainingTime} seconds before submitting again.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // Bot protection checks
      // 1. Honeypot check - should be caught by zod, but double-check
      if (data.honeypot && data.honeypot.trim().length > 0) {
        console.log('Bot detected via honeypot');
        toast({
          title: "Error",
          description: "There was a problem with your submission. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // 2. Time-based check - Submission should take at least 2 seconds (too fast is likely a bot)
      const timeDiff = now - data.timestamp;
      const MIN_FORM_TIME = 2000; // 2 seconds minimum
      if (timeDiff < MIN_FORM_TIME) {
        console.log(`Bot detected: Form submitted too quickly (${timeDiff}ms)`);
        toast({
          title: "Error",
          description: "Please take a moment to review your message before submitting.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // 3. Validate email format more strictly
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Clean and trim data
      const cleanData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim()
      };
      
      // Prepare email template parameters
      // These must match your EmailJS template variables exactly:
      // {{from_name}}, {{from_email}}, {{message}}, {{to_name}}, {{reply_to}}
      const templateParams: ContactFormParams = {
        from_name: cleanData.name,
        from_email: cleanData.email,
        message: cleanData.message,
        to_name: 'AIROTIX Operations',
        reply_to: cleanData.email,
        to_email: OPERATIONS_INBOX,
        subject: `Website inquiry from ${cleanData.name} (${cleanData.email})`,
      };
      
      console.log('Sending contact form email...');
      console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
      console.log('Template ID:', EMAILJS_CONFIG.CONTACT_TEMPLATE_ID);
      
      // Send email using the modern EmailJS SDK (already initialized in useEffect)
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', response.status, response.text);
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default"
      });

      // Reset form after successful submission
      form.reset({
        name: '',
        email: '',
        message: '',
        honeypot: '',
        timestamp: Date.now()
      });
      
      // Reset rate limiting on successful submission
      setSubmitAttempts(0);
      setLastSubmitTime(0);
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Enhanced error handling
      let errorMessage = "There was a problem sending your message. Please try again later.";
      const emailError = error as Partial<EmailJsError> | null;
      
      if (emailError && typeof emailError === 'object') {
        if (typeof emailError.status === 'number') {
          const status = emailError.status;
          if (status === 0) {
            errorMessage = "Network error. Please check your internet connection and try again.";
          } else if (status === 400) {
            errorMessage = "Invalid request. Please check your information and try again.";
          } else if (status === 401) {
            errorMessage = "Authentication failed. Please contact support if this persists.";
          } else if (status === 413) {
            errorMessage = "Message is too long. Please shorten your message and try again.";
          }
        }
        
        if (typeof emailError.text === 'string') {
          console.error('Error details:', emailError.text);
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Increment submit attempts on error too (to prevent abuse)
      setSubmitAttempts(prev => prev + 1);
      setLastSubmitTime(now);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return <section id="contact" className="bg-black text-white relative py-[25px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 bg-[#cf4500] text-white rounded-full text-sm font-medium">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contact Us Today
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions about our AI-powered sensor solutions? Reach out to our team and let's discuss how we can help bring your ideas to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#0a0a0a] rounded-xl shadow-xl p-8 border border-[#cf4500]/30 text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-gray-300">Name *</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-[#cf4500]/50" />
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            className="pl-10 bg-[#1a1a1a] border-[#cf4500]/30 text-white placeholder:text-gray-600" 
                            maxLength={100}
                            {...field} 
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-gray-700">Email *</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            className="pl-10" 
                            maxLength={255}
                            autoComplete="email"
                            {...field} 
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="message" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-gray-700">Message *</FormLabel>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project or inquiry..." 
                            className="min-h-[120px] pl-10 resize-none" 
                            maxLength={2000}
                            {...field} 
                          />
                        </FormControl>
                      </div>
                      <div className="flex justify-between items-center">
                        <FormMessage />
                        <span className={`text-xs ${messageCharCount > 1900 ? 'text-red-500' : 'text-gray-400'}`}>
                          {messageCharCount} / 2000
                        </span>
                      </div>
                    </FormItem>} />
                
                {/* Honeypot field - hidden from real users but bots will fill it */}
                <FormField control={form.control} name="honeypot" render={({
                field
              }) => <FormItem className="hidden">
                      <FormLabel>Leave this empty</FormLabel>
                      <FormControl>
                        <Input {...field} tabIndex={-1} />
                      </FormControl>
                    </FormItem>} />
                
                {/* Hidden timestamp field */}
                <FormField control={form.control} name="timestamp" render={({
                field
              }) => <FormItem className="hidden">
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>} />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || submitAttempts >= 3} 
                  className="w-full bg-[#cf4500] hover:bg-[#ff5a1a] text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : submitAttempts >= 3 ? (
                    "Please wait before submitting again"
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-[#0a0a0a] p-6 rounded-lg shadow-md border border-[#cf4500]/30 text-white">
              <div className="w-12 h-12 bg-[#cf4500] rounded-full flex items-center justify-center text-white mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400 mb-2">For general inquiries:</p>
              <a href="mailto:airotix@gmail.com" className="text-[#cf4500] hover:text-[#ff5a1a] transition-colors">airotix@gmail.com</a>
              <div className="mt-6 flex items-center gap-3 border-t border-[#cf4500]/20 pt-6">
                <Phone className="h-5 w-5 shrink-0 text-[#cf4500]" aria-hidden />
                <a
                  href="tel:+13236421125"
                  className="text-[#cf4500] hover:text-[#ff5a1a] transition-colors"
                  aria-label="Call AIROTIX at (323) 642-1125"
                >
                  (323) 642-1125
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default ContactForm;
