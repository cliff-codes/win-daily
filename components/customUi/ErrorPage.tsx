import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center place-items-center '>
        <div>You provided invalid credentials :(.</div>
       <Link href={'/login'}>
        <Button>try again</Button>
       </Link>
    </div>
  )
}

export default ErrorPage