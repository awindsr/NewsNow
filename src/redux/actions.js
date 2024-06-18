// actions.js

export const setArticles = articles => ({
    type: 'SET_ARTICLES',
    payload: articles,
  });
  
  export const setSelectedCategory = category => ({
    type: 'SET_SELECTED_CATEGORY',
    payload: category,
  });
  
  export const setCurrentPage = page => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
  });
  
  export const addBookmark = article => ({
    type: 'ADD_BOOKMARK',
    payload: article,
  });
  
  export const removeBookmark = article => ({
    type: 'REMOVE_BOOKMARK',
    payload: article,
  });
  