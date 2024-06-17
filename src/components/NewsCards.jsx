import React from "react";

export default function NewsCards({newsItem }) {
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
    <div className="lg:w-1/4 w-1/3 flex flex-col gap-2 md:justify-around lg:items-start">
         <div>
        <img
          src={newsItem.imageUrl}
          alt={newsItem.title}
          className="md:w-96 md:h-72 w-60 h-40 object-cover object-center"
        />
      </div>
      <div className=" w-full">
        <p className="text-gray-600 text-[.8rem] md:Text-xl">
          {/* {newsItem.author} . {calculateTimeAgo(newsItem.publishedAt)} */}
          {newsItem.author} . {newsItem.date}. {newsItem.time}
        </p>
        <h1 className="lg:text-3xl md:text-2xl text font-medium">
          {newsItem.title}
        </h1>
        <h1 className=" text font-light">
          {newsItem.content.slice(0, 200)}...<span className="text-blue-500">Readmore</span>
        </h1>
      </div>
     
    </div>
  );
}
