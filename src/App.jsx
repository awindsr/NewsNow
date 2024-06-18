// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';

import Homepage from './pages/Homepage';
import BookMarks from './pages/BookMarks';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/bookmarks" element={<BookMarks />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
