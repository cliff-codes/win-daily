import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'


const NoStreaksBoard = () => {
  return (
    <div className='w-full'>
        <div className='w-full  h-56 bg-slate-50 flex justify-center place-items-center flex-col rounded-md gap-1'>
            <h1>No streaks😞</h1>
            <Popover>
                <PopoverTrigger>start a streak</PopoverTrigger>

                <PopoverContent>
                    set up streak challenge
                </PopoverContent>
            </Popover>
        </div>

        <div>
            
        </div>
    </div>
  )
}

export default NoStreaksBoard