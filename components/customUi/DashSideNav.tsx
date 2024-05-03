"use client"
import clsx from 'clsx'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const DashSideNav = () => {
    const pathName = usePathname()
    console.log(pathName)
    const currentPath = pathName.split("/").pop()
    console.log(currentPath)

    const sideNavLinks = [
        {
            name: "streaks 🔥",
            link: "/streaks"
        },
        {
            name: "challenges 🏆",
            link: "/challenges"
        },
        {
            name: "resolutions 💡",
            link: "/resolutions"
        },
        {
            name: "habit change ♻",
            link: "/habit-change"
        },
    ]
  return (
    <div className='h-96 min-w-60 bg-slate-50 px-3 flex flex-col pt-3 gap-2 rounded-md'>
        {
            sideNavLinks.map((el, index) => (
                <Link href={`/dashboard${el.link}`} key={index}>
                    <Button className={clsx("w-full bg-slate-200 text-slate-900 hover:text-slate-50", 
                        currentPath === el.link && "bg-slate-900 text-slate-50"
                    )}>{el.name}</Button>
                </Link>
            ))
        }
    </div>
  )
}

export default DashSideNav