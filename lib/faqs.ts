/* ────────────────────────────────────────────────────────────────
   FAQS — the home page list, shared with the service pages so an
   answer is written once. Answers are 50–100 words and use the
   service names people search for (revision brief #48). Each service
   in lib/services picks its questions by `id`.
──────────────────────────────────────────────────────────────── */

export type Faq = { id: string; q: string; a: string };

export const FAQS: Faq[] = [
  {
    id: 'full-service',
    q: 'What does PUSHWebb handle as a full service content agency?',
    a: 'PUSHWebb provides YouTube management, short form content, video production, post production, social media management, performance creative and AI content production. As a full service content agency, we can own the whole pipeline — strategy, research, scripting, production, editing, design, publishing and performance analysis — or take on the parts your team needs most. Because one team runs every stage, what we learn from the analytics goes straight back into the next round of content instead of getting lost between vendors.',
  },
  {
    id: 'youtube',
    q: 'Can PUSHWebb manage our entire YouTube operation?',
    a: 'Yes. Through YouTube as a Service, our team manages the complete YouTube operation: channel strategy and content pillars, research, scripting, production, editing, thumbnails and titles, publishing, SEO and analytics. Every upload is planned around retention, watch time and click-through rate, and each video’s performance shapes the next. Our team manages 10+ YouTube channels across creators, brands and content-led businesses, and we can take over a channel end to end or plug into an existing in-house team.',
  },
  {
    id: 'brands-and-creators',
    q: 'Does PUSHWebb work with brands as well as creators?',
    a: 'Yes. PUSHWebb works with creators, brands, corporate teams, institutions and creative agencies. Our roster spans creator-led podcasts and YouTube channels as well as consumer apps, hospitality and electronics brands. The system is the same for both — strategy, production, distribution and performance working together — but the plan changes: creators usually need consistent output and channel growth, while brands often need content that supports awareness, campaigns and conversion across several platforms.',
  },
  {
    id: 'organic-and-paid',
    q: 'Can PUSHWebb manage both organic content and paid performance?',
    a: 'Yes. PUSHWebb runs organic content and paid performance as one connected system instead of two separate functions. Our team handles social media management and short-form content alongside performance creative and paid campaigns on Meta, Google and YouTube. Organic posts show which ideas and hooks earn attention; the strongest become ad creative, and campaign data on reach, click-through and conversion feeds back into what we make next.',
  },
  {
    id: 'high-volume',
    q: 'Can PUSHWebb handle high volume content production every month?',
    a: 'Yes. The PUSHWebb team operates content workflows capable of delivering more than 1,500 videos per month. A team of 16+ specialists across strategy, research, writing, editing, design, social, YouTube and AI moves each piece through the same stages — script, produce, edit, quality control and publish — so output can rise without losing consistency. Long-form videos, Shorts, Reels, trailers and social assets all run through that one production system.',
  },
  {
    id: 'white-label',
    q: 'Do you offer white label content production for agencies?',
    a: 'Yes. Creative and marketing agencies can use PUSHWebb as a white label production partner for video editing, post production, short-form content, content clipping and YouTube production. We work to your brand guidelines, formats and approval process, deliver under your name and keep client communication with you. It is a practical way for agencies to add production capacity and handle high-volume months without hiring and managing a full in-house editing team.',
  },
  {
    id: 'editing',
    q: 'Does PUSHWebb provide video editing and post production separately?',
    a: 'Yes. Video editing and post production can be booked on their own, without a full content retainer. If you already shoot in-house, send us raw footage and our editors handle the cut, pacing, captions, graphics, thumbnails and final exports for long-form videos, Shorts, Reels, trailers and social assets. Every file goes through human quality control before delivery, and the work can grow into a wider content system later if you need it.',
  },
  {
    id: 'ai',
    q: 'How does PUSHWebb use AI in content production?',
    a: 'PUSHWebb uses AI to remove repetitive, time-heavy steps from content production — research support, repurposing long-form into short-form, metadata and captions, scheduling, publishing workflows and performance reporting. That lets the team deliver more content, faster. AI does not replace creative judgement: strategy, scripting decisions, editing and final approvals stay with our people, and every AI-assisted output goes through human quality control before it reaches a client or a platform.',
  },
  {
    id: 'dubai',
    q: 'Does PUSHWebb work with businesses in Dubai and the UAE?',
    a: 'Yes. PUSHWebb operates in Dubai and works with brands, creators and organisations across the UAE, while delivering for clients globally. PUSHWebb is a content, creative, performance and AI agency serving brands, creators and organisations from Dubai. UAE businesses get the full service mix — YouTube management, short-form content, video production, social media management, performance creative and AI content production — from one team structured for high-volume delivery.',
  },
  {
    id: 'single-campaign',
    q: 'Can PUSHWebb handle a single campaign before moving into a retainer?',
    a: 'Yes. You can start with a focused project — a single campaign, a content sprint, a podcast launch or a batch of short-form videos — before committing to an ongoing retainer. A project runs through the same discovery, strategy, execution and optimisation process as a retainer, so you see how the system works on real content. If it is a fit, what we learned carries straight into a longer engagement without starting from scratch.',
  },
];

export const faqsById = (ids: string[]) =>
  ids.map((id) => FAQS.find((faq) => faq.id === id)).filter((faq): faq is Faq => Boolean(faq));
