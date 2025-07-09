import { connectToDB } from '@/lib/connectionSetup';
import { User } from '@/lib/models';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import generatePassword from 'generate-password';
import { logInUser } from '@/lib/userController';

// Extend the built-in session types
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        name: string;
    }
}

const customPassword = generatePassword.generate({
    length: 16,
    numbers: true,
    symbols: true,
    uppercase: true,
    excludeSimilarCharacters: true,
});

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter email and password');
                }

                try {
                    const response = await logInUser(credentials.email, credentials.password);

                    if (response.success && response.data) {
                        return {
                            id: response.data.id,
                            email: response.data.email,
                            name: response.data.userName,
                        };
                    } else {
                        throw new Error(response.error || 'Authentication failed');
                    }
                } catch (error: any) {
                    throw new Error(error.message || 'Authentication failed');
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email || '',
                    name: user.name || '',
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            // Only handle Google sign-in
            if (account?.provider === 'google') {
                try {
                    await connectToDB();

                    const { email, name } = user;

                    if (!email || !name) {
                        throw new Error('Missing email or name from Google');
                    }

                    // Check if user exists in the database
                    const existingUser = await User.findOne({ email });

                    if (!existingUser) {
                        // Create a new user
                        const salt = await bcryptjs.genSalt(10);
                        const hashedPassword = bcryptjs.hashSync(customPassword, salt);

                        const newUser = new User({
                            userName: name,
                            email: email,
                            password: hashedPassword,
                        });

                        await newUser.save();
                    }

                    return true;
                } catch (error) {
                    console.error('Google sign-in error:', error);
                    return false;
                }
            }

            return true;
        },
    },
    pages: {
        signIn: '/login',
        error: '/error',
    },
    debug: process.env.NODE_ENV === 'development',
};
