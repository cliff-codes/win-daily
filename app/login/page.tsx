import LoginForm from "@/components/forms/LoginForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/authOptions"

const LoginPage = async() => {
  const session = await getServerSession(authOptions)

  if(session){
    redirect("/dashboard/streaks")
  }
  
  return (
    <div className="h-full flex justify-center place-items-center">
      {!session && <LoginForm/>}
    </div>
  )
}

export default LoginPage