import { Input } from '@/components/ui/input'



const SetUpAStreak = () => {
  return (
    <div className='w-full h-96 bg-slate-50'>
      <h1 className='text-center pt-2 font-medium'>Set up a streak challenge</h1>

      <form className='w-full flex flex-col place-items-center mt-4'>
        <div className='flex flex-col gap-2 max-w-80'>
          <label className='text-sm font-medium' htmlFor='streak-name'>
            Streak name
          </label>
          <Input
            className='w-72 bg-slate-200 text-slate-900 rounded-md'
            type='text'
            name='streak-name'
            id='streak-name'
          />
        </div>

        {/* field to input number of days required for streak */}
        <div className='flex flex-col gap-2 max-w-80 mt-4'>
          <label className='text-sm font-medium' htmlFor='streak-days'>
            Number of days
          </label>
          <Input
            className='w-72 bg-slate-200 text-slate-900 rounded-md'
            type='number'
            name='streak-days'
            id='streak-days'
          />
        </div>

        {/* date field to select the starting date of the streak */}
        
        <div className='flex flex-col gap-2 max-w-80 mt-4'>
          <label className='text-sm font-medium' htmlFor='streak-start-date'>
            Start date
          </label>
          <Input
            className='w-72 bg-slate-200 text-slate-900 rounded-md'
            type='date'
            name='streak-start-date'
            id='streak-start-date'
          />
        </div>

        {/* read only date field which get set by default depending on the  starting date of the streak and number of days selected in the number of days field  */}
        
      
      </form>
    </div>
  )
}

export default SetUpAStreak