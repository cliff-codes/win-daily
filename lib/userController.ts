'use server';
import { NextResponse } from 'next/server';
import { connectToDB } from './connectionSetup';
import bcryptjs from 'bcryptjs';
import { User } from './models';

// Define consistent return types
interface AuthResponse {
    success: boolean;
    data?: any;
    error?: string;
}

// Signing up as a user
export const addUser = async (
    userName: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    if (!userName || !email || !password) {
        return {
            success: false,
            error: 'All fields are required',
        };
    }

    try {
        await connectToDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                success: false,
                error: 'User with this email already exists',
            };
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ userName });
        if (existingUsername) {
            return {
                success: false,
                error: 'Username already taken',
            };
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        // Create user
        const newUser = new User({
            email,
            userName,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Return user data without password
        const userData = {
            id: savedUser._id,
            email: savedUser.email,
            userName: savedUser.userName,
            createdAt: savedUser.createdAt,
        };

        return {
            success: true,
            data: userData,
        };
    } catch (error: any) {
        console.error('Error creating user:', error);
        return {
            success: false,
            error: 'Failed to create account. Please try again.',
        };
    }
};

export const logInUser = async (
    email: string | FormDataEntryValue,
    password: string | FormDataEntryValue
): Promise<AuthResponse> => {
    if (!email || !password) {
        return {
            success: false,
            error: 'Email and password are required',
        };
    }

    try {
        await connectToDB();
        const user = await User.findOne({ email: email.toString() });

        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        const isPasswordValid = bcryptjs.compareSync(password.toString(), user.password);

        if (!isPasswordValid) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        // Return user data without password
        const userData = {
            id: user._id,
            email: user.email,
            userName: user.userName,
            createdAt: user.createdAt,
        };

        return {
            success: true,
            data: userData,
        };
    } catch (error: any) {
        console.error('Login error:', error);
        return {
            success: false,
            error: 'Login failed. Please try again.',
        };
    }
};

export const findUserName = async (email: string): Promise<string> => {
    try {
        await connectToDB();
        const user = await User.findOne({ email: email });

        if (!user) {
            return '';
        }
        return user.userName;
    } catch (error) {
        console.error('Error finding username:', error);
        throw new Error('Error finding username');
    }
};
