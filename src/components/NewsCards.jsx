import React, { useState } from "react";
import { faBookmark, faShapes, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailedModal from "./DetailedModal";

export default function NewsCards({ newsItem }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false); // State for showing copy message

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let updatedBookmarks;

    if (bookmarked) {
      updatedBookmarks = bookmarks.filter(
        (article) => article.hashId !== newsItem.hashId
      );
      setBookmarked(false);
    } else {
      updatedBookmarks = [...bookmarks, newsItem];
      setBookmarked(true);
    }

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        console.log("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="lg:w-1/4 md:w-[40vw] w-[35vw] flex flex-col gap-2 md:justify-around lg:items-start">
      <div>
        <div className="relative w-full">
          <img
            src={newsItem.imageUrl}
            alt={newsItem.title}
            className="md:w-96 md:h-72 w-full h-[20vh] object-cover object-center rounded-md"
          />
          <button
            className="text-blue-500 cursor-pointer focus:outline-none   absolute top-2 left-2 bg-white text-[.8rem] p-2 rounded-full"
            onClick={() => copyToClipboard(newsItem.readMoreUrl)}
          >
            <FontAwesomeIcon icon={faShare} className="text-sm " />
          </button>
          {copied && (
            <div className="w-auto h-[10vh] absolute z-8 transform transition ease-in-out duration-200">
              <div className="bg-green-400  shadow-lg text-white font-bold p-2 rounded-md">
                <p>Link copied to clipboard</p>
              </div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faBookmark}
            className={`absolute top-2 right-2 bg-white text-sm  p-2 rounded-full ${
              bookmarked ? "text-green-500" : "text-red-300"
            }`}
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
          <span className="text-blue-500 cursor-pointer" onClick={openModal}>
            Read more
          </span>{" "}
        
          
        </h1>
      </div>

      <DetailedModal
        isOpen={isOpen}
        closeModal={closeModal}
        newsItem={newsItem}
        readMoreUrl={newsItem.readMoreUrl}
      />
    </div>
  );
}
