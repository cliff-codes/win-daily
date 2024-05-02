import LinkBtn from "./LinkBtn"
import Logo from "./Logo"

const NavBar = () => {
  return (
    <nav className="h-16 flex justify-center bg-slate-50 py-3">
      <div className="w-full max-w-7xl h-full flex place-items-center justify-between px-3">
        <Logo logoColor={"text-slate-900"}/>

        <LinkBtn name={"login"} route={'/login'} submissionType={undefined} disabled = {false}/>
      </div>
    </nav>
  )
}

export default NavBar