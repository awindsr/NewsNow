import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DetailedModal from "./DetailedModal";


export default function NewsCards({ newsItem }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

 useEffect(() => {
    // Check if the article is already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmarked = bookmarks.some(article => article.hashId === newsItem.hashId);
    setBookmarked(isBookmarked);
  }, [newsItem.hashId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let updatedBookmarks;

    if (bookmarked) {
      // Remove bookmark
      updatedBookmarks = bookmarks.filter(article => article.hashId !== newsItem.hashId);
      setBookmarked(false);
    } else {
      // Add bookmark
      updatedBookmarks = [...bookmarks, newsItem];
      setBookmarked(true);
    }

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };
  
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
    <div className="lg:w-1/4 md:w-[40vw] w-[35vw] flex flex-col gap-2 md:justify-around lg:items-start " >
      <div>
        <div className="relative w-full">
          <img
            src={newsItem.imageUrl}
            alt={newsItem.title}
            className="md:w-96 md:h-72 w-full h-[20vh] object-cover object-center rounded-md"
          />
          <FontAwesomeIcon
            icon={faBookmark}
            className={`absolute top-2 right-2 bg-white text-[.8rem] lg:text-xl lg:p-4 p-2 rounded-full ${bookmarked ? 'text-green-500' : 'text-red-300'}`}
            onClick={toggleBookmark}
          />
        </div>
      </div>
      <div className="w-full">
        <p className="text-gray-600 text-[.5rem] md:text-[.8rem]">
          {newsItem.author} . {newsItem.date} . {newsItem.time}
        </p>
        <h1 className="lg:text-3xl md:text-2xl text-[.9rem] font-medium">
          {newsItem.title}
        </h1>
        <h1 className="text-[.8rem] md:text-[1rem] font-light">
          {newsItem.content.slice(0, 200)}...
          <span
            className="text-blue-500 cursor-pointer"
            onClick={openModal}
          >
            Read more
          </span>
        </h1>
      </div>
      
      <DetailedModal isOpen={isOpen} closeModal={closeModal} newsItem={newsItem} readMoreUrl={newsItem.readMoreUrl} />
    </div>
  );
}
