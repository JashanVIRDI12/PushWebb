'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import './hover-glow-button.css';

export interface HoverGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}
type GlowStyle = React.CSSProperties & {
  '--glow-color': string;
  '--glow-background': string;
  '--glow-text': string;
  '--glow-hover-text': string;
};
/** Pointer-following glow recreated from the public Jahed / EaseMize preview. */
export const HoverGlowButton = React.forwardRef<HTMLButtonElement, HoverGlowButtonProps>(function HoverGlowButton({ children, className, asChild = false, glowColor = '#10b981', backgroundColor = '#080b0a', textColor = '#67e8f9', hoverTextColor = '#ffffff', onPointerMove, style, type, ...props }, ref) {
  const child = asChild ? React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode }> : null;
  const content = <><span className="hover-glow-button__light" aria-hidden="true" /><span className="hover-glow-button__label">{child ? child.props.children : children}</span></>;
  const Comp = asChild ? Slot : 'button';
  const colors: GlowStyle = { '--glow-color': glowColor, '--glow-background': backgroundColor, '--glow-text': textColor, '--glow-hover-text': hoverTextColor, ...style };
  return <Comp ref={ref} type={asChild ? undefined : type ?? 'button'} className={cn('hover-glow-button', className)} style={colors} onPointerMove={(event: React.PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.matches(':disabled')) {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    }
    onPointerMove?.(event);
  }} {...props}>{child ? React.cloneElement(child, undefined, content) : content}</Comp>;
});
HoverGlowButton.displayName = 'HoverGlowButton';
export default HoverGlowButton;
