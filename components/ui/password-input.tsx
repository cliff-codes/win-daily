import { useState } from 'react';
import { Input } from './input';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    className?: string;
}

export const PasswordInput = ({ error, className, ...props }: PasswordInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className='relative'>
            <Input
                {...props}
                type={isPasswordVisible ? 'text' : 'password'}
                className={cn(
                    'w-full h-12 px-4 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors',
                    error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
                    className
                )}
            />
            <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1'
                onClick={togglePasswordVisibility}
            >
                {!isPasswordVisible ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
        </div>
    );
};
