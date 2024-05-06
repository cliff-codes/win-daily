
"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useState } from "react"
import { FaSpinner } from "react-icons/fa"

  

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {data: session} = useSession()

    const firstCharOfUserName = session?.user?.name?.substring(0,1)
    console.log(firstCharOfUserName)

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