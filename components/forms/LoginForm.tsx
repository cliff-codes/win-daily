'use client';
import { useEffect } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import passwordValidator from 'password-validator';
import validator from 'validator';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState<boolean | any[]>(true);
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        console.log('working');
        setIsPasswordVisible(!isPasswordVisible);
    };

    //schema to check how strong the password is.
    const passwordSchema = new passwordValidator();
    passwordSchema.is().min(8).has().uppercase().has().lowercase().has().digits(1).has().symbols(1);

    const validatePassword = (password: string): boolean | any[] => {
        const isValid = passwordSchema.validate(password);
        return isValid;
    };

    //validating email
    const validateEmail = (email: string) => {
        const bool = validator.isEmail(email);
        setIsEmailValid(bool);
    };

    useEffect(() => {
        if (!(email == '')) {
            validateEmail(email);
        }
        if (!(password == '')) {
            setIsPasswordValid(validatePassword(password));
        }
    }, [email, password]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await signIn('credentials', {
            email: email,
            password: password,
            redirect: true,
            callbackUrl: callbackUrl ? callbackUrl : '/dashboard/streaks',
        });
        setIsLoading(false);
    };

    return (
        <form
            className='flex flex-col place-items-center  gap-6 border bg-slate-50 px-10 py-16 rounded-md'
            onSubmit={handleFormSubmit}
        >
            <h4 className='text-center text-slate-900 capitalize font-bold '>Login</h4>
            <div className='flex flex-col gap-2'>
                <div>
                    <Input
                        className='w-80'
                        type='email'
                        name='email'
                        required
                        onChange={handleEmailChange}
                    />
                    {!isEmailValid && (
                        <div className='text-sm bg-red-300 text-red-600 px-4 my-1 rounded-sm'>
                            invalid email
                        </div>
                    )}
                </div>
                <div>
                    <div className='flex place-items-center relative'>
                        <Input
                            className='w-80 pr-6'
                            type={isPasswordVisible ? 'text' : 'password'}
                            name='password'
                            required
                            onChange={handlePasswordChange}
                        />
                        <span
                            className='absolute right-2 cursor-pointer hover:bg-slate-50 py-1 px-1 box-border rounded-full z-50'
                            onClick={() => togglePasswordVisibility()}
                        >
                            {!isPasswordVisible ? <IoMdEyeOff size={16} /> : <IoMdEye size={16} />}
                        </span>
                    </div>
                    {!isPasswordValid && (
                        <div className='text-sm bg-red-300 text-red-600 px-4 my-1 rounded-sm '>
                            Password must be strong.
                            <br /> Please include a combination of <br />
                            lowercase letters, uppercase letters,
                            <br /> numbers, and special characters
                        </div>
                    )}
                </div>
            </div>

            {/* submit form data */}
            <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading ? <FaSpinner size={20} className='animate-spin' /> : 'login'}
            </Button>

            <div className='text-center text-sm'>or login with</div>
            <div className='flex justify-center'>
                <Button type='button' onClick={() => signIn('google')}>
                    <FaGoogle size={24} />
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
