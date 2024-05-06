import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { findUserName } from "@/lib/userController"

import { getServerSession } from "next-auth"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { signOut } from "next-auth/react"


const UserProfileById = async() => {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email as string
    const name = await findUserName(email)

      //signOut user
      const handleSignOut = () => {
        signOut()
    }
    
    const firstCharOfUserName = name.substring(0,1)
  
    return (
        <Popover>
        <PopoverTrigger>
            <div className="w-12 h-12 rounded-full bg-slate-200 flex justify-center place-items-center border-4 border-slate-900  "><div>{firstCharOfUserName}</div></div>
        </PopoverTrigger>
        <PopoverContent>
            <Button onClick={handleSignOut}  className="w-full">
                logout
            </Button>
        </PopoverContent>
    </Popover>
  )
}

export default UserProfileById