import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, OPERATIONS_INBOX, type ContactFormParams } from "@/config/emailjs";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().min(1, "Company name is required").max(100),
  email: z.string().min(1, "Email is required").email("Please enter a valid email").max(255).toLowerCase().trim(),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(20)
    .regex(/^[0-9\s+().-]+$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000).trim(),
  honeypot: z.string().max(0, "Bot detected"),
  timestamp: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-all focus:border-orange-300/55 focus:bg-black/45 focus:outline-none focus:ring-1 focus:ring-orange-300/20 focus:shadow-[0_0_34px_rgba(249,115,22,0.12)] disabled:opacity-50";

function Label({ children, required }: { children: string; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
      {children}
      {required ? <span className="text-orange-300"> *</span> : null}
    </label>
  );
}

const HomeContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState(Date.now());
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "",
      timestamp: formStartTime,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!privacyAccepted) {
      toast({
        title: "Privacy policy",
        description: "Please agree to the privacy policy before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (data.honeypot?.trim()) {
        setIsSubmitting(false);
        return;
      }
      if (Date.now() - data.timestamp < 2000) {
        toast({
          title: "Error",
          description: "Please take a moment before submitting.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const workEmail = data.email.trim().toLowerCase();
      const lines = [
        `Website inquiry - reply to: ${workEmail}`,
        "",
        `Name: ${data.name.trim()}`,
        `Company: ${data.company.trim()}`,
        `Phone: ${data.phone.trim()}`,
        "",
        "Message:",
        data.message.trim(),
      ];

      const formattedMessage = lines.join("\n");
      const subject = `Website inquiry from ${data.name.trim()} (${workEmail})`;

      const templateParams: ContactFormParams = {
        from_name: data.name.trim(),
        from_email: workEmail,
        message: formattedMessage,
        to_name: "AIROTIX Operations",
        reply_to: workEmail,
        to_email: OPERATIONS_INBOX,
        subject,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        templateParams as unknown as Record<string, unknown>
      );

      toast({ title: "Message sent!", description: `We'll respond at ${workEmail} if needed.` });
      form.reset({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        honeypot: "",
        timestamp: Date.now(),
      });
      setPrivacyAccepted(false);
    } catch {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#090909] py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(249,115,22,0.16),transparent_30%),radial-gradient(circle_at_86%_30%,rgba(56,189,248,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-8 h-48 w-48 rounded-full border border-orange-300/10 bg-orange-500/5 blur-sm" />
        <div className="absolute bottom-6 left-10 h-2 w-2 rounded-full bg-orange-300/40 shadow-[0_0_18px_rgba(249,115,22,0.8)]" />
      </div>

      <div className="container relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="md:pr-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
              <Sparkles className="h-3.5 w-3.5" />
              Project Intake
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-normal text-white md:text-4xl lg:text-5xl">
              Tell us where AI should create leverage.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-400 md:max-w-none">
              Short note on your project is enough. We reply from{" "}
              <span className="text-zinc-200">{OPERATIONS_INBOX}</span>.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-500/10 text-xs font-bold tracking-tight text-orange-100">
                AI
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AIROTIX</p>
                <p className="text-xs text-zinc-500">Engineering and operations</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${OPERATIONS_INBOX}`}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-orange-300/35 hover:bg-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/30"
                aria-label={`Email ${OPERATIONS_INBOX}`}
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href={`mailto:${OPERATIONS_INBOX}`}
                className="text-sm text-zinc-200 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {OPERATIONS_INBOX}
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label required>Full name</Label>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                      {...form.register("name")}
                      disabled={isSubmitting}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-[11px] text-red-400/90">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label required>Company</Label>
                    <input
                      type="text"
                      autoComplete="organization"
                      placeholder="Company"
                      className={inputClass}
                      {...form.register("company")}
                      disabled={isSubmitting}
                    />
                    {form.formState.errors.company && (
                      <p className="mt-1 text-[11px] text-red-400/90">{form.formState.errors.company.message}</p>
                    )}
                  </div>
                  <div>
                    <Label required>Email</Label>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputClass}
                      {...form.register("email")}
                      disabled={isSubmitting}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-[11px] text-red-400/90">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label required>Phone</Label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 555 000 0000"
                      className={inputClass}
                      {...form.register("phone")}
                      disabled={isSubmitting}
                    />
                    {form.formState.errors.phone && (
                      <p className="mt-1 text-[11px] text-red-400/90">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label required>Message</Label>
                  <textarea
                    rows={4}
                    placeholder="What are you trying to automate, detect, predict, or improve?"
                    className={`${inputClass} min-h-[112px] resize-y leading-relaxed`}
                    {...form.register("message")}
                    disabled={isSubmitting}
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-[11px] text-red-400/90">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <label className="relative mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(event) => setPrivacyAccepted(event.target.checked)}
                      className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      aria-describedby="privacy-policy-text"
                    />
                    <span className="pointer-events-none flex h-4 w-4 items-center justify-center rounded border border-white/25 bg-transparent transition-colors peer-focus-visible:ring-1 peer-focus-visible:ring-orange-300/40 peer-checked:border-orange-300 peer-checked:bg-orange-300">
                      {privacyAccepted ? <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} /> : null}
                    </span>
                  </label>
                  <p id="privacy-policy-text" className="text-[11px] leading-snug text-zinc-500">
                    I agree my data will be processed per the{" "}
                    <Link to="/privacy-policy" className="text-zinc-300 underline-offset-2 hover:text-white hover:underline">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>

                <input type="text" {...form.register("honeypot")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input type="hidden" {...form.register("timestamp", { valueAsNumber: true })} />

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full border border-orange-300/30 bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_50px_rgba(249,115,22,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(249,115,22,0.34)] disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
