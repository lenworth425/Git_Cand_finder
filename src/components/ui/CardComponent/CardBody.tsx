import React from 'react';
import '../custom.css';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardContentProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={`card-content ${className || ''}`} {...props}>
    {children}
  </div>
));

CardBody.displayName = 'CardBody';