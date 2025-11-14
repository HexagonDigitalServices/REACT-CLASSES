import { useState } from "react"
import UserContext from "./UserContext"
import Home from "./Home"
import Parent from "./Parent"
import Profile from "./Profile"
import ThemeContext from "./ThemeContext"

function App() {
  const [user, setUser] = useState("ankit")
  const [theme, setTheme] = useState("dark")
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{theme,setTheme}}>
        {/* <Home/> */}
        {/* <Parent/> */}
        <Profile />
      </ThemeContext.Provider>
    </UserContext.Provider>

  )
}

export default App
