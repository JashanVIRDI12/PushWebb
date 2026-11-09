'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import './campaign-buttons.css';
export interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(function ShinyButton({children,className,asChild=false,type,...props},ref){
  const child=asChild ? React.Children.only(children) as React.ReactElement<{children?:React.ReactNode}> : null;
  const content=<span>{child ? child.props.children : children}</span>;
  const Comp=asChild ? Slot : 'button';
  return <Comp ref={ref} type={asChild ? undefined : type ?? 'button'} className={cn('shiny-cta',className)} {...props}>{child ? React.cloneElement(child,undefined,content) : content}</Comp>;
});
