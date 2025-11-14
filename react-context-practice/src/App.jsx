import { useState } from "react"
import AuthContext from "./AuthContext"
import Navbar from "./Navbar"
import Home from "./Home"

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [user,setUser] = useState("ankit")

  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,user}}>
      <Navbar/>
      <Home/>
    </AuthContext.Provider>
  )
}

export default App
