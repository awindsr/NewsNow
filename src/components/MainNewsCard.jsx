import React from 'react'

export default function MainNewsCard({ newsItem}) {
    
    const calculateTimeAgo = (publishedAt) => {
        const publishedDate = new Date(publishedAt);
        const currentDate = new Date();
        const timeDifference = currentDate - publishedDate; // Difference in milliseconds
    
        // Convert milliseconds to seconds
        const secondsDifference = Math.floor(timeDifference / 1000);
    
        if (secondsDifference < 60) {
          return `${secondsDifference} seconds ago`;
        } else if (secondsDifference < 3600) {
          const minutesDifference = Math.floor(secondsDifference / 60);
          return `${minutesDifference} minutes ago`;
        } else if (secondsDifference < 86400) {
          const hoursDifference = Math.floor(secondsDifference / 3600);
          return `${hoursDifference} hours ago`;
        } else {
          const daysDifference = Math.floor(secondsDifference / 86400);
          return `${daysDifference} days ago`;
        }
      };
  return (
    <div className=' flex flex-col gap-2 md:flex-row md:justify-around lg:items-start'>
        <div className='md:w-3/5 w-full'>
            <p className='text-gray-600'>{newsItem.author} . {newsItem.date}</p>
            <h1 className='lg:text-5xl md:text-4xl text-[1.5rem] font-medium'>{newsItem.title}</h1>
        </div>
        <div>
            <img src={newsItem.imageUrl} alt={newsItem.title} className='w-96 h-72 object-cover'/>
        </div>
    </div>
  )
}
