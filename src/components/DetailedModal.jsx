import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function DetailedModal({ isOpen, closeModal, newsItem, readMoreUrl }) {
  const [showIframe, setShowIframe] = useState(false);

  const openIframe = () => setShowIframe(true);
  const closeIframe = () => setShowIframe(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-4xl relative">
        {!showIframe ? (
          <>
            <h2 className="text-xl font-bold mb-4">{newsItem.title}</h2>
            <p className="text-gray-600 mb-4">
              {newsItem.author} . {newsItem.date} . {newsItem.time}
            </p>
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              className="w-full h-96 mb-4 object-cover object-center rounded-md"
            />
            <p className="text-gray-800 text-[.9rem]">{newsItem.content}</p>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
              <button
                className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                onClick={openIframe}
              >
                Source <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
              </button>
            </div>
          </>
        ) : (
          <div className="relative inset-0 bg-white w-full h-screen">
            <iframe
              src={readMoreUrl}
              title="Source"
              className=" absolute top-0 w-full h-full"
            ></iframe>
            <button
              onClick={closeIframe}
              className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md z-50"
            >
              Close Source
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailedModal;
