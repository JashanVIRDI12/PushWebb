'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useLenis } from 'lenis/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUILDER, VSL } from '@/lib/pushwave/content';
import { submitProposal, type ProposalLead } from '@/lib/pushwave/lead';
import { CONTACT_EMAIL } from '@/lib/site';
import { PwButton } from '../ui/pw-button';

type Field = 'name' | 'email' | 'phone' | 'company' | 'contentLink';
type Values = Record<Field, string>;
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'mailto' } | { kind: 'error'; message: string };

const FIELDS: { id: Field; label: string; type: string; autoComplete: string; required: boolean; inputMode?: 'url' | 'tel' | 'email' }[] = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true, inputMode: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true, inputMode: 'tel' },
  { id: 'company', label: 'Company', type: 'text', autoComplete: 'organization', required: false },
  { id: 'contentLink', label: 'Content link', type: 'text', autoComplete: 'url', required: false, inputMode: 'url' },
];

function validate(values: Values) {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone.replace(/[^\d]/g, '').length < 7) errors.phone = 'Please enter a phone number we can reach you on.';
  return errors;
}

/**
 * The lead form behind "Get My Custom Proposal". A native modal <dialog>:
 * focus is trapped and restored, Escape closes it. Lenis is paused while it
 * is open; `data-lenis-prevent` lets the form itself scroll on short screens.
 * The submit endpoint is configured in lib/pushwave/lead.ts (TODO there).
 */
export function ProposalDialog({
  open,
  onClose,
  contentLink,
  summary,
  totalLine,
}: {
  open: boolean;
  onClose: () => void;
  contentLink: string;
  summary: string[];
  totalLine: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const uid = useId();
  const [values, setValues] = useState<Values>({ name: '', email: '', phone: '', company: '', contentLink: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      // Carry over the link from builder step 08 unless they've typed one here.
      setValues((current) => (current.contentLink ? current : { ...current, contentLink }));
      setStatus((current) => (current.kind === 'sent' || current.kind === 'mailto' ? current : { kind: 'idle' }));
      dialog.showModal();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, contentLink, lenis]);

  // However it closes (Escape, the close button, a backdrop click), hand scrolling back.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onDialogClose = () => {
      lenis?.start();
      onClose();
    };
    dialog.addEventListener('close', onDialogClose);
    return () => dialog.removeEventListener('close', onDialogClose);
  }, [lenis, onClose]);

  const update = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = FIELDS.find((field) => found[field.id]);
    if (first) {
      document.getElementById(`${uid}-${first.id}`)?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    const lead: ProposalLead = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      contentLink: values.contentLink.trim(),
      summary,
    };
    const result = await submitProposal(lead);
    if (result.status === 'sent') setStatus({ kind: 'sent' });
    else if (result.status === 'mailto') {
      setStatus({ kind: 'mailto' });
      window.location.href = result.href;
    } else setStatus({ kind: 'error', message: result.message });
  };

  const done = status.kind === 'sent' || status.kind === 'mailto';

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${uid}-title`}
      data-lenis-prevent
      className="pw-dialog"
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === ref.current) ref.current?.close();
      }}
    >
      <div className="relative p-6 md:p-10">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-pw-soft shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-colors hover:bg-[rgb(242_242_240/0.08)] hover:text-pw-ink md:right-6 md:top-6"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="pw-label">{BUILDER.label}</p>
        <h2 id={`${uid}-title`} className="pw-d3 mt-4 max-w-[16ch] pr-10">
          {BUILDER.cta}
        </h2>

        {done ? (
          <div className="mt-8 space-y-4" role="status">
            {status.kind === 'sent' ? (
              <p className="pw-lead text-pw-ink">Thank you, {values.name.split(' ')[0]}. Your request is in.</p>
            ) : (
              <p className="pw-lead text-pw-ink">
                Your email app should now open with your request filled in. If it doesn’t, write to{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="pw-link text-pw-wave-ink">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}
            <p className="pw-fine">{VSL.note}</p>
            <div className="pt-4">
              <PwButton label="Close" variant="ghost" onClick={() => ref.current?.close()} magnetic={false} />
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((field) => {
                const id = `${uid}-${field.id}`;
                const error = errors[field.id];
                return (
                  <div key={field.id} className={cn('flex flex-col gap-2', field.id === 'contentLink' && 'sm:col-span-2')}>
                    <label htmlFor={id} className="text-sm font-medium text-pw-soft">
                      {field.label}
                      {field.required ? <span aria-hidden className="text-pw-wave-ink"> *</span> : null}
                    </label>
                    <input
                      id={id}
                      name={field.id}
                      type={field.type}
                      inputMode={field.inputMode}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      value={values[field.id]}
                      onChange={(event) => update(field.id, event.target.value)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `${id}-error` : undefined}
                      placeholder={field.id === 'contentLink' ? 'https://' : undefined}
                      className="pw-field"
                    />
                    {error ? (
                      <p id={`${id}-error`} className="text-sm text-[#ff8a8a]">
                        {error}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-[rgb(242_242_240/0.03)] p-4 shadow-[inset_0_0_0_1px_var(--color-pw-line)]">
              <p className="text-xs font-medium text-pw-steel">{BUILDER.estimateTitle}</p>
              <p className="mt-1 font-pw-display text-lg font-semibold text-pw-ink">{totalLine}</p>
            </div>

            {status.kind === 'error' ? (
              <p className="mt-4 text-sm text-[#ff8a8a]" role="alert">
                {status.message}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex-none">
                <PwButton type="submit" label={status.kind === 'sending' ? 'Sending…' : BUILDER.cta} disabled={status.kind === 'sending'} magnetic={false} />
              </span>
              <p className="pw-fine">{VSL.note}</p>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
