import SignUpForm from '@/components/forms/SignUpForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const SignUp = async() => {
  const session = await getServerSession(authOptions)

  if(session){
    redirect("/")
  }
  return (
    <div className='h-full flex-1 flex justify-center place-items-center'>
        <SignUpForm/>
    </div>
  )
}

export default SignUp