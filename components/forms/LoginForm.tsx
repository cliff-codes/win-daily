'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loginSchema, type LoginFormData } from '@/lib/zodSchemas';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });


    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError('root', {
                    type: 'manual',
                    message:
                        'Invalid email or password. Please check your credentials and try again.',
                });
            } else {
                // Redirect on success
                window.location.href = callbackUrl || '/dashboard/streaks';
            }
        } catch (error) {
            setError('root', {
                type: 'manual',
                message: 'An unexpected error occurred. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="on"
                    className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6'
                >
                    {/* Header */}
                    <div className='text-center space-y-2'>
                        <h1 className='text-3xl font-bold text-gray-900'>Welcome Back</h1>
                        <p className='text-gray-600'>Sign in to your account to continue</p>
                    </div>

                    {/* Form Fields */}
                    <div className='space-y-4'>
                        {/* Email Field */}
                        <div className='space-y-2'>
                            <label htmlFor='email' className='text-sm font-medium text-gray-700'>
                                Email Address
                            </label>
                            <Input
                                id='email'
                                className={`w-full h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors ${errors.email
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : ''
                                    }`}
                                type='email'
                                placeholder='Enter your email'
                                {...register('email')}
                            />
                            {errors.email && (
                                <div className='text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200'>
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className='space-y-2'>
                            <label htmlFor='password' className='text-sm font-medium text-gray-700'>
                                Password
                            </label>
                            {/* Password Input */}
                            <div className='relative'>

                                <Input
                                    id='password'
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    {...register('password')}
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1'
                                    onClick={togglePasswordVisibility}
                                >
                                    {!isPasswordVisible ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <div className='text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200'>
                                    {errors.password.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Root Error */}
                    {errors.root && (
                        <div className='text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200'>
                            {errors.root.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type='submit'
                        disabled={isSubmitting || isLoading}
                        className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting || isLoading ? (
                            <LoadingSpinner text='Signing in...' />
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                    {/* Divider */}
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300' />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <Button
                        type='button'
                        onClick={() => signIn('google')}
                        className='w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2'
                    >
                        <FaGoogle size={20} className='text-red-500' />
                        <span>Sign in with Google</span>
                    </Button>

                    {/* Links */}
                    <div className='space-y-3 text-center'>
                        <div className='text-sm text-gray-600'>
                            Don&apos;t have an account?{' '}
                            <Link
                                href='/sign-up'
                                className='text-blue-600 hover:text-blue-700 font-medium'
                            >
                                Sign up
                            </Link>
                        </div>
                        <div className='text-sm'>
                            <Link
                                href='/forgot-password'
                                className='text-blue-600 hover:text-blue-700 font-medium'
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
