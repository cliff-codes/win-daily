import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
    text?: string;
}

export const LoadingSpinner = ({ size = 18, className = '', text }: LoadingSpinnerProps) => {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <FaSpinner size={size} className='animate-spin' />
            {text && <span>{text}</span>}
        </div>
    );
};
