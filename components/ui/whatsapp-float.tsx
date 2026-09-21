'use client';

import { motion } from 'framer-motion';
import { WHATSAPP_GREETING, WHATSAPP_NUMBER, whatsappLink } from '@/lib/site';

/* The one always-there conversion shortcut. It lives in the root layout so
   every route carries it, and it sits below the toast stack (z-[10000]) and
   below the navbar's dropdowns (z-[100]) — a sticky button should never be
   the thing that covers a message or a menu. */

function WhatsAppGlyph({ className }: { className?: string }) {
  // Lucide ships no brand marks, so the glyph is inline.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.8 11.8 0 0 0-3.48-8.413" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group/whatsapp fixed bottom-4 right-4 z-[95] flex items-center gap-2 print:hidden sm:bottom-6 sm:right-6"
    >
      {/* The label is a desktop affordance only: on a phone the glyph is
          already unambiguous and screen width is worth more. */}
      <span
        aria-hidden
        className="pointer-events-none hidden translate-x-2 rounded-full border border-line bg-white/95 px-3 py-1.5 text-xs font-medium text-ink opacity-0 shadow-[0_10px_28px_-18px_rgba(11,26,43,0.5)] backdrop-blur transition-[opacity,transform] duration-300 group-hover/whatsapp:translate-x-0 group-hover/whatsapp:opacity-100 md:block"
      >
        Chat on WhatsApp
      </span>

      <a
        href={whatsappLink(WHATSAPP_GREETING)}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="whatsapp-float"
        aria-label={`Chat with PUSHWebb on WhatsApp at ${WHATSAPP_NUMBER}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-12px_rgba(37,211,102,0.75)] ring-1 ring-black/5 transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#1ebe5b] hover:shadow-[0_18px_40px_-12px_rgba(37,211,102,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5"
      >
        <WhatsAppGlyph className="h-7 w-7" />
      </a>
    </motion.div>
  );
}
