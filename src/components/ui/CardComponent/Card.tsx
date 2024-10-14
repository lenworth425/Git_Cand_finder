import React from 'react';
import '../custom.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => (
    <div ref={ref} className={`card ${className || ''}`} {...props}>
      {children}
    </div>
  ));
  
  Card.displayName = 'Card';