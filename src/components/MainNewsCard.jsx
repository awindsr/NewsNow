import React from 'react'

export default function MainNewsCard({ newsItem}) {
    
   
  return (
    <div className=' flex flex-col gap-2 md:flex-row md:justify-around lg:items-start'>
        <div className='md:w-3/5 w-full flex flex-col items-start gap-1'>
            <p className='text-gray-600'>{newsItem.author} . {newsItem.date}</p>
            <h1 className='lg:text-5xl md:text-4xl font-newsreader text-[1.5rem] font-medium'>{newsItem.title}</h1>
        </div>
        <div>
            <img src={newsItem.imageUrl} alt={newsItem.title} className='w-96 h-72 object-cover'/>
        </div>
    </div>
  )
}
