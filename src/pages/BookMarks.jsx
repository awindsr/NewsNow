import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { removeBookmark } from '../redux/actions'; // Import action to remove bookmark

export default function BookMarks() {
    const bookmarks = useSelector(state => state.bookmarks); // Fetch bookmarks from Redux store
    const dispatch = useDispatch();

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

    const handleRemoveBookmark = (article) => {
        dispatch(removeBookmark(article)); // Dispatch action to remove bookmark
    };

    return (
        <div>
            <Header />
            {bookmarks.length === 0 ? (
                <div className="flex items-center justify-center h-[80vh]">
                    <p className="text-2xl">No Bookmarks.</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-4">
                    {bookmarks.map((article) => (
                        <div key={article.hashId} className="lg:w-1/4 md:w-[40vw] w-[35vw] p-9 flex flex-col gap-2 md:justify-around lg:items-start">
                            <div>
                                <div className="relative w-full">
                                    <img
                                        src={article.imageUrl}
                                        alt={article.title}
                                        className="md:w-96 md:h-72 w-full h-[20vh] object-cover object-center rounded-md"
                                    />
                                    <FontAwesomeIcon
                                        icon={faBookmark}
                                        onClick={() => handleRemoveBookmark(article)}
                                        className="absolute top-2 right-2 text-3xl text-green-500 cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <p className="text-primary text-sm">{article.category}</p>
                                    <h1 className="text-2xl font-semibold">{article.title}</h1>
                                    <p className="text-gray-500 text-sm">{article.description}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-500 text-sm">{calculateTimeAgo(article.publishedAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}
