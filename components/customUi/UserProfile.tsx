
"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { findUserName } from "@/lib/userController"

  

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [firstCharOfUserName, setFirstCharOfUserName] = useState("")

    const {data: session} = useSession()

    async function getUserName(){
      const sessionEmail = session?.user?.email
      if(sessionEmail){
        const name = await findUserName(sessionEmail)
        setFirstCharOfUserName(name.substring(0,1))
      }
    }
    
    useEffect(() => {
      if(session?.user?.name?.substring(0,1)){
        setFirstCharOfUserName(session?.user?.name?.substring(0,1))
      }else{
        getUserName()
      }
    },[])
  

    //signOut user
    const handleSignOut = () => {
        setIsLoading(true)
        signOut()
        setIsLoading(false)
    }

  return (
    <Popover>
        <PopoverTrigger>
            <div className="w-12 h-12 rounded-full bg-slate-200 flex justify-center place-items-center border-4 border-slate-900  "><div>{firstCharOfUserName}</div></div>
        </PopoverTrigger>
        <PopoverContent>
            <Button onClick={handleSignOut}  className="w-full">
                {isLoading ? <FaSpinner size={20} className="animate-spin"/> : "logout"}
            </Button>
        </PopoverContent>
    </Popover>
  )
}

export default UserProfile