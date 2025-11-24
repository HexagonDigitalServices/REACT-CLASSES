import React from "react"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Watches from "./pages/Watches/Watches"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/watches" element = {<Watches/>}/>
      </Routes>

    </>
  )
}

export default App
