
import LinkBtn from "./LinkBtn"
import Logo from "./Logo"
import { getServerSession } from "next-auth"
import UserProfile from "../customUi/UserProfile"
import { authOptions } from "@/authOptions"

const NavBar = async() => {
  const session = await getServerSession(authOptions)
  return (
    <nav className="h-16 flex justify-center bg-slate-50 py-3">
      <div className="w-full max-w-7xl h-full flex place-items-center justify-between px-3">
        <Logo logoColor={"text-slate-900"}/>



        {session && <UserProfile/>}
        {!session && <LinkBtn name={"login"} route={'/login'} submissionType={undefined} disabled = {false}/>}
      </div>
    </nav>
  )
}

export default NavBar