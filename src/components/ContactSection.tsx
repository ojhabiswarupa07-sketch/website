import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail, Pencil, Send } from 'lucide-react';
import { ContactInfo } from '../types/portfolio';

interface ContactSectionProps {
  contact: ContactInfo;
  onEditContact: () => void;
}

export function ContactSection({ contact, onEditContact }: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'prepared'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormStatus('error');
      setErrorMsg('Please fill in your name, email address, and message.');
      return;
    }

    const emailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${trimmedName}`
    );
    const emailBody = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`
    );

    const isPlaceholderEmail = contact.email.includes('example.com');
    setFormStatus('prepared');
    setErrorMsg('');

    if (!isPlaceholderEmail) {
      window.location.href = `mailto:${contact.email}?subject=${emailSubject}&body=${emailBody}`;
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">06. Contact</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Let&apos;s connect
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {contact.locationNote}
            </p>
          </div>

          <button
            type="button"
            onClick={onEditContact}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/12 bg-[#0B0B10] px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Pencil className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
            <span>Edit Contact Links</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Direct Contact Channels */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-[#0A0A0E] p-7 lg:col-span-5"
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium text-zinc-400">Email Address</p>
                <p className="mt-1.5 break-all font-display text-lg font-medium text-white">
                  {contact.email}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    <Mail className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                    <span>Compose Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/12 px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-medium text-zinc-400">LinkedIn Profile</p>
                <p className="mt-1.5 break-all text-sm font-medium text-zinc-200">
                  {contact.linkedinLabel || contact.linkedinUrl}
                </p>
                <div className="mt-3">
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    <span>Open LinkedIn</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {contact.githubUrl ? (
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs font-medium text-zinc-400">GitHub Profile</p>
                  <p className="mt-1.5 break-all text-sm font-medium text-zinc-200">
                    {contact.githubUrl}
                  </p>
                  <div className="mt-3">
                    <a
                      href={contact.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    >
                      <span>Open GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs leading-relaxed text-zinc-400">
                Tip: Click &ldquo;Edit Contact Links&rdquo; above to replace placeholder
                links with your personal email, LinkedIn, and GitHub URLs.
              </p>
            </div>
          </motion.div>

          {/* Interactive Message Form */}
          <motion.form
            onSubmit={handleFormSubmit}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-[#0A0A0E] p-7 lg:col-span-7"
          >
            <h3 className="font-display text-xl font-semibold text-white">
              Send a message
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Prepare a direct email inquiry for internships or project collaboration.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-300">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1.5 w-full rounded-lg border border-white/12 bg-[#050507] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-300">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1.5 w-full rounded-lg border border-white/12 bg-[#050507] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-300">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Internship opportunity / Collaboration"
                className="mt-1.5 w-full rounded-lg border border-white/12 bg-[#050507] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="mt-1.5 w-full resize-y rounded-lg border border-white/12 bg-[#050507] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none"
              />
            </div>

            {formStatus === 'error' && errorMsg ? (
              <p role="alert" className="mt-4 text-xs font-medium text-rose-300">
                {errorMsg}
              </p>
            ) : null}

            {formStatus === 'prepared' ? (
              <div
                role="status"
                className="mt-4 rounded-lg border border-violet-500/35 bg-violet-950/25 px-4 py-3 text-xs leading-relaxed text-violet-200"
              >
                {contact.email.includes('example.com')
                  ? 'Message validated! Update the placeholder email using "Edit Contact Links" so your mail client opens with your real address.'
                  : `Draft prepared for ${contact.email}. If your email client did not open automatically, use the Compose Email or Copy button.`}
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:from-purple-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>Send Message</span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
