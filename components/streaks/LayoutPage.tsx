"use client"
import {useState} from 'react'
import DashSideNav from '../customUi/DashSideNav'
import { Calendar } from '../ui/calendar';

const LayoutPage = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [date, setDate] = useState<Date | undefined>(new Date)
  return (

    <div className="w-full max-w-7xl mx-3 flex gap-5 pt-8">
        <DashSideNav/>
        {children}
        <Calendar 
            mode="single"
            selected = {date}
            className="hidden rounded-md border bg-slate-50 lg:flex"
         />
    </div>

  )
}

export default LayoutPage