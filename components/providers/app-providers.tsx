'use client';

import { ToastProvider } from '@/components/ui/toast';
import { MotionConfig } from 'framer-motion';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
