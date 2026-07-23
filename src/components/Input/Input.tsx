'use client';

import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { EyeIcon, EyeOffIcon } from '@/components/icons';
import cls from './Input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: 'chat' | 'form';
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { variant = 'chat', label, error, className, placeholder, type, ...props },
    ref
) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPassword = type === 'password';

    if (variant === 'form') {
        return (
            <label className={cls.field}>
                {label && <span className={cls.label}>{label}</span>}
                <span className={cls.inputWrap}>
                    <input
                        ref={ref}
                        type={isPassword ? (passwordVisible ? 'text' : 'password') : type}
                        className={clsx(
                            cls.input,
                            isPassword && cls.inputHasToggle,
                            error && cls.inputError,
                            className
                        )}
                        placeholder={placeholder}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className={cls.toggle}
                            onClick={() => setPasswordVisible((visible) => !visible)}
                            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                        >
                            {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    )}
                </span>
                {error && <span className={cls.error}>{error}</span>}
            </label>
        );
    }

    return (
        <input
            ref={ref}
            type="text"
            className={clsx(cls.input, className)}
            placeholder={placeholder ?? 'Message Late Night Co-op'}
            {...props}
        />
    );
});

export default Input;
