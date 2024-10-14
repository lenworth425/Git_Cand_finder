import React from 'react';
import '../custom.css';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={`card-header ${className || ''}`} {...props}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';