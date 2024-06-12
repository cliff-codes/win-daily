
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NoStreaksBoard = () => {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <div className='w-full'>
        <div className='w-full  h-96 bg-slate-50 flex justify-center place-items-center flex-col rounded-md gap-1'>
            <h1>No streaks😞</h1>
            
            <Link href={`${pathname}/set-up`}>
              <Button>add  streak</Button>
            </Link>
        </div>

        <div>
            
        </div>
    </div>
  )
}

export default NoStreaksBoard