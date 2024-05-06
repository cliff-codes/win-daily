"use client"
import {Calendar} from "@/components/ui/calendar"
import NoStreaksBoard from '@/components/streaks/NoStreaksBoard'
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Streaks = () => {
    const {data:session} = useSession()

    if(!session){
        redirect('/login')
    }

    const [date, setDate] = useState<Date | undefined>(new Date)
  return (
    <div className='w-full lg:flex lg:gap-5'>
        {/* No available streaks board */}
         <NoStreaksBoard/>
         <Calendar 
            mode="single"
            selected = {date}
            className="hidden rounded-md border bg-slate-50 lg:flex"
         />
    </div>
  )
}

export default Streaks