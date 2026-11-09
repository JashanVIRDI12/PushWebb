import { CONTACT_EMAIL } from '@/lib/site';

export type ProposalLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  contentLink: string;
  /** Human-readable builder configuration and estimate, line by line. */
  summary: string[];
};

/**
 * TODO(pushwave-endpoint): wire the proposal form to a real endpoint.
 *
 * Set NEXT_PUBLIC_PUSHWAVE_PROPOSAL_ENDPOINT to any URL that accepts a JSON
 * POST of `ProposalLead` (a Route Handler, a CRM webhook, a form service).
 * Until it is set, the form does not pretend to succeed: it opens a
 * pre-filled email to CONTACT_EMAIL so no enquiry is lost.
 */
const PROPOSAL_ENDPOINT = process.env.NEXT_PUBLIC_PUSHWAVE_PROPOSAL_ENDPOINT ?? '';

export type SubmitResult = { status: 'sent' } | { status: 'mailto'; href: string } | { status: 'error'; message: string };

function mailtoFor(lead: ProposalLead) {
  const subject = `PUSHWAVE proposal request — ${lead.company || lead.name}`;
  const body = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Company: ${lead.company || '—'}`,
    `Content link: ${lead.contentLink || '—'}`,
    '',
    'Campaign builder configuration:',
    ...lead.summary,
  ].join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitProposal(lead: ProposalLead): Promise<SubmitResult> {
  if (!PROPOSAL_ENDPOINT) return { status: 'mailto', href: mailtoFor(lead) };

  try {
    const response = await fetch(PROPOSAL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'pushwave-campaign-builder', ...lead }),
    });
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return { status: 'sent' };
  } catch {
    return {
      status: 'error',
      message: `We couldn’t send the request. Email ${CONTACT_EMAIL} and we’ll pick it up from there.`,
    };
  }
}
