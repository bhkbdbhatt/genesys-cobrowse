import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const base = 'px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center justify-center gap-2';
    const variants = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};