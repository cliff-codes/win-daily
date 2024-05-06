"use server"
import { NextResponse } from "next/server"
import { connectToDB } from "./connectionSetup"
import bcrypt from 'bcrypt'
import { User } from "./models"
import bcryptjs from "bcrypt"


//signing up as a user
export const addUser = async(e:FormData) => {

    const {userName, email, password} = Object.fromEntries(e)

    if(!userName || !email || !password){
        return NextResponse.json({error: 'Input field data missing'}, {status: 500})
    }

    try {
        await connectToDB()

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hashSync(password as string, salt)

        //create user
        const newUser = new User({
            email,
            userName,
            password: hashedPassword
        })

        console.log(newUser)

        await newUser.save()
    } catch (error) {
        console.log(error)
        NextResponse.json({error, 'message': 'Failed creating user account'})
    }
}

export const logInUser = async (email: string, password: string) => {
    try {
      await connectToDB();
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User Not Found.");
      }
  
      const isOk = await bcryptjs.compare(password, user.password);
      console.log("isOk:", isOk);
      if (!isOk) {
        throw new Error("Invalid email or password");
      }
      return { data: user, error: null };
    } catch (error: any) {
      console.log("user", error.message);
      // handleError(error);
      return { data: null, error: error.message };
    }
  };

export const findUserName = async(email: string) => {
  try {
    await connectToDB()

    const user = await User.findOne({email: email})
  
    if(!user){
      return '' 
    }
    return await user._doc.userName
  } catch (error) {
    throw new Error("Error finding username")
  }
}