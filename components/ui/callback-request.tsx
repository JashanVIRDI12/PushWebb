'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle2, Loader2, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { CONTACT_EMAIL, EMAILJS, WHATSAPP_NUMBER, whatsappLink } from '@/lib/site';

/* ────────────────────────────────────────────────────────────────
   REQUEST A CALLBACK — for visitors who would rather leave a number
   than pick a slot in the calendar.

   Two delivery paths, tried in order, because a phone number that
   reaches nobody is worse than no form at all:

     1. EmailJS, straight from the browser to the inbox.
     2. /api/callback-request, which mails through Resend server-side —
        used when EmailJS is down, blocked by an extension, or out of
        quota for the month.

   Only if both fail does the card show an error, and it then offers
   WhatsApp and email so the lead still has somewhere to go.
──────────────────────────────────────────────────────────────── */

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Loose on formatting, strict on substance: a number you could dial.
 *  The route re-checks this — this copy only saves a round trip. */
function isDiallable(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** Email is optional here, so this only runs on a non-empty value. Shape,
 *  not deliverability — the inbox is the real validator. */
function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CallbackRequest({ className }: { className?: string }) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const succeed = () => {
    setStatus('sent');
    setName('');
    setPhone('');
    setEmail('');
    setNote('');
    toast({
      type: 'success',
      title: 'Number received',
      message: 'We will call you back within 24 hours.',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    if (!name.trim()) {
      setError('Please add your name so we know who we are calling.');
      return;
    }
    if (!isDiallable(phone)) {
      setError('Please enter a phone number we can reach you on, with country code.');
      return;
    }
    if (email.trim() && !looksLikeEmail(email.trim())) {
      setError('That email address does not look right. Leave it blank if you prefer.');
      return;
    }

    setError(null);
    setStatus('sending');

    // Bot bait was filled in. Show the same success the visitor would see
    // and send nothing, so the bot learns nothing from the difference.
    if (company) {
      succeed();
      return;
    }

    const received = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Dubai',
    }).format(new Date());

    // Names match the {{placeholders}} in the EmailJS template. EmailJS
    // templates have no conditionals, so anything optional is given a
    // readable stand-in here rather than left to render as a blank line.
    const templateParams = {
      from_name: name.trim(),
      phone: phone.trim(),
      // wa.me and tel: want digits only, so the template gets both forms.
      phone_digits: phone.replace(/\D/g, ''),
      email: email.trim() || 'Not provided',
      // Replying to the mail reaches the visitor when they left an address,
      // and the inbox itself when they didn't — never an empty header.
      reply_to: email.trim() || CONTACT_EMAIL,
      note: note.trim() || 'No extra details added.',
      received,
      page_url: typeof window === 'undefined' ? '/contact' : window.location.href,
    };

    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, templateParams, {
        publicKey: EMAILJS.publicKey,
      });
      succeed();
      return;
    } catch (emailjsError) {
      // Quota, a blocked request, an EmailJS outage — worth knowing about in
      // the console, but not worth telling the visitor while a second path
      // is still untried.
      console.warn('[callback] EmailJS did not send; trying the server route.', emailjsError);
    }

    try {
      const response = await fetch('/api/callback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, note }),
      });
      const result = (await response.json().catch(() => null)) as { reason?: string } | null;

      if (!response.ok) {
        setStatus('error');
        setError(result?.reason || 'We could not send that just now.');
        return;
      }

      succeed();
    } catch {
      setStatus('error');
      setError('We could not reach the server. Check your connection and try again.');
    }
  };

  const fieldClass =
    'w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors duration-200 focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-accent/15 disabled:opacity-60';

  const cardClass = `premium-card rounded-xl border border-line bg-surface p-5 ${className ?? ''}`;

  if (status === 'sent') {
    return (
      <div className={cardClass}>
        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-paper">
          <CheckCircle2 className="h-4 w-4 text-ink" />
        </div>
        <p className="mb-1 text-[10px] uppercase tracking-widest text-ink-muted">Number received</p>
        <p className="text-sm font-medium text-ink">We&apos;ll call you back within 24 hours.</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
          If it&apos;s urgent, message us on{' '}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-[11px] font-medium text-ink-soft underline underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          Send another number
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} noValidate className={cardClass}>
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-paper">
        <Phone className="h-4 w-4 text-ink" />
      </div>
      <p className="mb-1 text-[10px] uppercase tracking-widest text-ink-muted">Prefer a call?</p>
      <p className="text-sm font-medium text-ink">Leave your number</p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
        We&apos;ll call you back within 24 hours.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        <div>
          <label htmlFor="callback-name" className="sr-only">
            Your name
          </label>
          <input
            id="callback-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={sending}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="callback-phone" className="sr-only">
            Your phone number
          </label>
          <input
            id="callback-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Phone number, e.g. +971 50 000 0000"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={sending}
            aria-invalid={error ? true : undefined}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="callback-email" className="sr-only">
            Your email address (optional)
          </label>
          <input
            id="callback-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={sending}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="callback-note" className="sr-only">
            What you need help with (optional)
          </label>
          <textarea
            id="callback-note"
            name="note"
            rows={2}
            placeholder="What you need help with (optional)"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            disabled={sending}
            className={`${fieldClass} resize-none`}
          />
        </div>
      </div>

      {/* Bot bait. Hidden from people and from assistive tech; the route
          silently drops anything that fills it in. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="callback-company">Company (leave blank)</label>
        <input
          id="callback-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      {error ? (
        <p role="alert" className="mt-2.5 text-[11px] leading-relaxed text-red-700">
          {error}
          {status === 'error' ? (
            <>
              {' '}
              Reach us on{' '}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                WhatsApp
              </a>{' '}
              or{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-4">
                email
              </a>{' '}
              instead.
            </>
          ) : null}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 motion-safe:active:scale-[0.99]"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          'Request a callback'
        )}
      </button>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
        Goes straight to our inbox. Rather talk now?{' '}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
        >
          WhatsApp {WHATSAPP_NUMBER}
        </a>
      </p>
    </form>
  );
}
