import React from 'react'

const ReadingsItem = () => {
  return (
    <li className='w-4/12 h-full flex flex-col justify-center items-center text-center text-white bg-stone-800 rounded-xl gap-4'>
        <h3 className='text-2xl font-bold'>عنوان مقاله</h3>
        <button className='bg-black rounded-lg py-1.5 px-3'>بیشتر بدانید</button>
    </li>
  )
}

export default ReadingsItem