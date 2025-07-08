'use server';
import { NextResponse } from 'next/server';
import { connectToDB } from './connectionSetup';
import bcryptjs from 'bcryptjs';
import { User } from './models';

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}
//signing up as a user
export const addUser = async (userName: string, email: string, password: string) => {
    if (!userName || !email || !password) {
        return NextResponse.json({ error: 'Input field data missing' }, { status: 500 });
    }

    try {
        await connectToDB();

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = bcryptjs.hashSync(password as string, salt);

        //create user
        const newUser = new User({
            email,
            userName,
            password: hashedPassword,
        });

        const res = await newUser.save();
        return { data: res };
    } catch (error) {
        console.log(error);
        NextResponse.json({ error, message: 'Failed creating user account' });
    }
};

export const logInUser = async (
    email: string | FormDataEntryValue,
    password: string | FormDataEntryValue
) => {
    try {
        await connectToDB();
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error('User Not Found.');
        }

        const isOk = bcryptjs.compareSync(password as string, user.password);

        if (!isOk) {
            throw new Error('Invalid email or password');
        }
        return { data: user, error: null };
    } catch (error: any) {
        console.log('user', error.message);
        return { data: null, error: error.message };
    }
};

export const findUserName = async (email: string): Promise<string> => {
    try {
        await connectToDB();

        const user = await User.findOne({ email: email });

        if (!user) {
            return '';
        }
        return await user._doc.userName;
    } catch (error) {
        throw new Error('Error finding username');
    }
};
