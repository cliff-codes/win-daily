import React from 'react';
import { Button } from '../ui/button';
import { FaSpinner } from 'react-icons/fa';
import { useFormStatus } from 'react-dom';

const SubmitBtn = ({ name }: { name: string }) => {
    const { pending } = useFormStatus();
    return (
        <Button type='submit' disabled={pending} className='w-full max-w-80'>
            {pending ? <FaSpinner size={18} className='animate-spin' /> : `${name}`}
        </Button>
    );
};

export default SubmitBtn;
