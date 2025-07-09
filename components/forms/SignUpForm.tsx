'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Input } from '../ui/input';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/loading-spinner';
import { addUser } from '@/lib/userController';
import { signIn } from 'next-auth/react';
import { signUpSchema, type SignUpFormData } from '@/lib/zodSchemas';
import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';

const SignUpForm = () => {
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
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange',
    });

    const handleGoogleSignUp = async () => {
        setIsLoading(true);
        try {
            const result = await signIn('google', { redirect: false });
            if (result?.error) {
                setError('root', {
                    type: 'manual',
                    message: 'Google sign up failed. Please try again.',
                });
            } else if (result?.ok) {
                window.location.href = '/dashboard/streaks';
            }
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: 'Google sign up failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const response = await addUser(data.userName, data.email, data.password);

            if (response.success) {
                // Auto-login after successful signup
                const signInResult = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (signInResult?.error) {
                    setError('root', {
                        type: 'manual',
                        message: 'Account created but login failed. Please try logging in.',
                    });
                } else {
                    // Only redirect after successful login, never with sensitive data in the URL
                    window.location.href = '/dashboard/streaks';
                }
            } else {
                setError('root', {
                    type: 'manual',
                    message: response.error || 'Failed to create account. Please try again.',
                });
            }
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: 'An unexpected error occurred. Please try again.',
            });
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off"
                        className='space-y-6'
                    >
                        {/* Header */}
                        <div className='text-center space-y-2'>
                            <h1 className='text-3xl font-bold text-gray-900'>Create Account</h1>
                            <p className='text-gray-600'>Join us to start building your habits</p>
                        </div>

                        {/* Form Fields */}
                        <div className='space-y-4'>
                            {/* Username Field */}
                            <div className='space-y-2'>
                                <label
                                    htmlFor='userName'
                                    className='text-sm font-medium text-gray-700'
                                >
                                    Username
                                </label>
                                <Input
                                    id='userName'
                                    className={`w-full h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors ${errors.userName
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : ''
                                        }`}
                                    type='text'
                                    placeholder='Enter your username'
                                    {...register('userName')}
                                />
                                {errors.userName && (
                                    <div className='text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200'>
                                        {errors.userName.message}
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className='space-y-2'>
                                <label
                                    htmlFor='email'
                                    className='text-sm font-medium text-gray-700'
                                >
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
                                <label
                                    htmlFor='password'
                                    className='text-sm font-medium text-gray-700'
                                >
                                    Password
                                </label>
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

                            {/* Confirm Password Field */}
                            <div className='space-y-2'>
                                <label
                                    htmlFor='confirmPassword'
                                    className='text-sm font-medium text-gray-700'
                                >
                                    Confirm Password
                                </label>
                                <div className='relative'>
                                    <Input
                                        id='confirmPassword'
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        placeholder='Confirm your password'
                                        {...register('confirmPassword')}
                                    />
                                    <button
                                        type='button'
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1'
                                        onClick={togglePasswordVisibility}
                                    >
                                        {!isPasswordVisible ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <div className='text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200'>
                                        {errors.confirmPassword.message}
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
                            disabled={isSubmitting}
                            className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isSubmitting ? (
                                <LoadingSpinner text='Creating account...' />
                            ) : (
                                'Create Account'
                            )}
                        </Button>

                        {/* Divider */}
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-300' />
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-gray-500'>
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Google Sign Up */}
                        <Button
                            type='button'
                            onClick={handleGoogleSignUp}
                            className='w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2'
                        >
                            {isLoading ? (
                                <LoadingSpinner size={20} />
                            ) : (
                                <>
                                    <FaGoogle size={20} className='text-red-500' />
                                    <span>Sign up with Google</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
