// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Booking from './pages/Booking/Booking'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />        {/* <- root */}
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  )
}

export default App
