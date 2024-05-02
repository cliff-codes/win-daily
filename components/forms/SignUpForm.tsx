'use client'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import validator from 'validator'
import passwordValidator from 'password-validator'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { Button } from '../ui/button'
import { addUser } from '@/lib/userController'
import SubmitBtn from '../customUi/SubmitBtn'
import {signIn} from "next-auth/react"



const SignUpForm = () => {
  
  const [userName, setUserName] = useState<string>("") 
  const [password, setPassword] = useState<string>("")
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | any[]>(true)
  const [email, setEmail] = useState<string>("")
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
  
  const [isPasswordVisible , setIsPasswordVisible] = useState(false)


  
  //schema to check how strong the password is.
  const passwordSchema = new passwordValidator()
  passwordSchema.is().min(8).has().uppercase().has().lowercase().has().digits(1).has().symbols(1)


  const validatePassword = (password: string):boolean | any[] =>{
    const isValid = passwordSchema.validate(password)
    return isValid
  }

  const togglePasswordVisibility = () => {
    console.log('working')
    setIsPasswordVisible(!isPasswordVisible)
  }

  //validating email
  const validateEmail = (email: string) => {
    const bool = validator.isEmail(email)
    setIsEmailValid(bool)
  }
  

  useEffect(() => {
    if(!(email == "")){
      validateEmail(email)
    }
    if(!(password == "")){
      setIsPasswordValid(validatePassword(password))
    }
  },[email, password])

  
  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  
  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  
  const handleUserNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }


  return (
    <div className='bg-slate-50 border rounded-md px-10 py-16 my-5'>
        <form className='flex flex-col gap-6  '
      action={addUser}
      >
      <h4 className='text-center text-slate-900 capitalize font-bold '>sign-up</h4>
      <div className='flex flex-col gap-2'>
        <div>
          <Input type='text' name='userName' placeholder='name' required onChange={handleUserNameChange} value={userName} />
        </div>

        <div>
          <Input className='w-80' type='email' name='email' required onChange={handleEmailChange} />
          {!isEmailValid && <div className='text-sm bg-red-300 text-red-600 px-4 my-1 rounded-sm'>invalid email</div>}
        </div>
        <div>
          <div className='flex place-items-center relative'>
            <Input className='w-80 pr-6' type={isPasswordVisible ? 'text' : 'password'} name='password' required onChange={handlePasswordChange}/>
            <span className='absolute right-2 cursor-pointer hover:bg-slate-50 py-1 px-1 box-border rounded-full z-50' onClick={() => togglePasswordVisibility()}>{!isPasswordVisible ? <IoMdEyeOff size={16}/> : <IoMdEye size={16}/>}</span>
          </div>
          {!isPasswordValid && <div className='text-sm bg-red-300 text-red-600 px-4 my-1 rounded-sm '>Password must be strong.<br/> Please include a combination of <br/>lowercase letters, uppercase letters,<br/> numbers, and special characters</div>}
        </div>
      </div>
      
      {/* submit form data */}
      <SubmitBtn name={'sign-up'}/>

      <div className='text-center text-sm'>or</div>
    </form>

      <div className='flex justify-center z-50'>
        <Button className='z-50' type='button' onClick={() => signIn("google")}>
          <FaGoogle size={24} />
        </Button>
      </div>
    </div>
  )
}

export default SignUpForm