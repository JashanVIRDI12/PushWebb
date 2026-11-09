'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import './3d-button.css';

/** Recreation of the linked 21st.dev preview; original source requires sign-in. */
export interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(function ThreeDButton({ children, className, asChild = false, type, ...props }, ref) {
  const child = asChild ? React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode }> : null;
  const content = child ? child.props.children : children;
  const face = <span className="three-d-button__face"><span className="three-d-button__label">{content}</span><ArrowRight className="three-d-button__arrow" size={18} aria-hidden="true" /></span>;
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} type={asChild ? undefined : type ?? 'button'} className={cn('three-d-button', className)} {...props}>{child ? React.cloneElement(child, undefined, face) : face}</Comp>;
});
ThreeDButton.displayName = 'ThreeDButton';
export { ThreeDButton as Component };
