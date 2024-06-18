// reducers.js

const initialState = {
  articles: [], // Initial state for articles
  selectedCategory: 'sports', // Example initial state for selected category
  currentPage: 1, // Example initial state for current page
  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [], // Initialize from localStorage
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.payload,
      };
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'ADD_BOOKMARK':
      // Check if the article is already bookmarked
      if (state.bookmarks.find(article => article.hashId === action.payload.hashId)) {
        return state; // If already bookmarked, do not add again
      }
      // Otherwise, add the new bookmark to both state and localStorage
      const updatedBookmarksAdd = [...state.bookmarks, action.payload];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarksAdd));
      return {
        ...state,
        bookmarks: updatedBookmarksAdd,
      };
    case 'REMOVE_BOOKMARK':
      // Remove the bookmark from both state and localStorage
      const updatedBookmarksRemove = state.bookmarks.filter(article => article.hashId !== action.payload.hashId);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarksRemove));
      return {
        ...state,
        bookmarks: updatedBookmarksRemove,
      };
    default:
      return state;
  }
};

export default rootReducer;
