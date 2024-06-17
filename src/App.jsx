import React from 'react'
import Homepage from './pages/Homepage'
import BookMarks from './pages/BookMarks'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/bookmarks' element={<BookMarks />} />
    </Routes>
    </BrowserRouter>
  )
}
