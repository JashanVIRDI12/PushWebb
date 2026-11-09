'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import './campaign-buttons.css';

function DoubleChevron({ index, dotColor }: { index: number; dotColor: string }) {
  const dots = [{cx:2,cy:2,d:0},{cx:5,cy:5,d:.05},{cx:8,cy:8,d:.1},{cx:5,cy:11,d:.15},{cx:2,cy:14,d:.2},{cx:6,cy:2,d:.05},{cx:9,cy:5,d:.1},{cx:12,cy:8,d:.15},{cx:9,cy:11,d:.2},{cx:6,cy:14,d:.25}];
  return <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true" focusable="false" className="shrink-0 overflow-visible"><g fill={dotColor}>{dots.map((p,i)=><circle key={i} cx={p.cx} cy={p.cy} r="1" className="bd-dot" style={{animationDelay:`${index * .12 + p.d}s`}} />)}</g></svg>;
}
export interface AntiMetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  label?: React.ReactNode;
  accentFrom?: string;
  accentTo?: string;
  dotColor?: string;
}
export const AntiMetalButton = React.forwardRef<HTMLButtonElement, AntiMetalButtonProps>(function AntiMetalButton({ className, children, label, accentFrom='#d6f54a', accentTo='#c5ea2c', dotColor='#0f0f0f', asChild=false, type, ...props }, ref) {
  const child = asChild ? React.Children.only(children) as React.ReactElement<{children?:React.ReactNode}> : null;
  const content = label ?? child?.props.children ?? children ?? 'Book a demo';
  const inside = <><span className="anti-metal-label">{content}</span><span aria-hidden="true" className="anti-metal-accent" style={{background:`linear-gradient(180deg, ${accentFrom} 0%, ${accentTo} 100%)`,boxShadow:'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)'}}>{[0,1,2,3,4].map(index=><DoubleChevron key={index} index={index} dotColor={dotColor} />)}</span></>;
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} type={asChild ? undefined : type ?? 'button'} className={cn('anti-metal-button',className)} {...props}>{child ? React.cloneElement(child, undefined, inside) : inside}</Comp>;
});
AntiMetalButton.displayName='AntiMetalButton';
export default AntiMetalButton;
