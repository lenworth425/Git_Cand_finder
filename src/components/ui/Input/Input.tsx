import React from 'react';
import '../custom.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`custom-input ${className || ''}`}
    {...props}
  />
));

Input.displayName = 'Input';

export default Input;