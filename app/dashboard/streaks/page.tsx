"use client"
import NoStreaksBoard from '@/components/streaks/NoStreaksBoard'
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Streaks = () => {
    const {data:session} = useSession()

    if(!session){
        redirect('/login')
    }

  return (
    <div className='w-full lg:flex lg:gap-5'>
        {/* No available streaks board */}
         <NoStreaksBoard/>
    </div>
  )
}

export default Streaks