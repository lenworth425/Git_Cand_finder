import React from 'react';
import '../custom.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }, ref) => (
  <button ref={ref} className={`button ${className || ''}`} {...props}>
    {children}
  </button>
));

Button.displayName = 'Button';