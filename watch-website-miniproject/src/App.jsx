import React from "react"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Watches from "./pages/Watches/Watches"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Orders from "./pages/Orders/Orders"
import Cart from "./pages/Cart/Cart"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/watches" element = {<Watches/>}/>
        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/my-orders" element={<Orders/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>

    </>
  )
}

export default App
