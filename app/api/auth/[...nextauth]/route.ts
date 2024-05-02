import { connectToDB } from "@/lib/connectionSetup"
import { User } from "@/lib/models"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import generatePassword from "generate-password"
import { logInUser } from "@/lib/userController"


const customPassword = generatePassword.generate({
    length: 16,
    numbers: true,
    symbols: true,
    uppercase: true,
    excludeSimilarCharacters: true
})


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email"},

                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Please enter email and password')
                }
                
                //login user
                const response = await logInUser(credentials.email, credentials.password)
                const loggedInUser = response.data
                console.log("logged: ", loggedInUser)

                //return user if everything is fine
                if(loggedInUser && response.error === null){
                    return loggedInUser
                }else{
                    throw new Error(response.error)
                }
            },
        })
    ],
    secret: process.env.NEXT_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({token, user}) {
            console.log("token : ", token)
            console.log("user : ", user)
            return token
        },
        async session({session, token}){
            if(session?.user){
                session.user = token
            }
            return session
        },
        async signIn({user}){
            await connectToDB()
            //extract user info from Google token
            const {email, name} = user

            //check if user exists in the database
            const existingUser = await User.findOne({email: email})
    
            
            if(!existingUser || null){
                //create a new user
                 console.log("working")
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = bcrypt.hashSync(customPassword, salt)
                const newUser = await new User({
                    userName: name,
                    email: email,
                    password: hashedPassword 
                })

                //save new user
                await newUser.save()
    
            }else{
                console.log("user already exist")
            }

            return true
        }
    },
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/login",
        error: "/error"
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}