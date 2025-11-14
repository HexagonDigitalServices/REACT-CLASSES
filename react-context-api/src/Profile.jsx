import { useContext } from "react"
import UserContext from "./UserContext"
import { useState } from "react"
import ThemeContext from "./ThemeContext"

function Profile(){
    const {user,setUser} = useContext(UserContext)
    const {theme,setTheme} = useContext(ThemeContext)
    const [username,setUsername] = useState("")

    return(
        <div>
            <h3>Current User: {user}</h3>
            <h3>Current Theme: {theme}</h3>
            <input type="text" placeholder="enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <button onClick={()=>setUser(username)}>Change User</button>
            <button onClick={()=>setTheme("white")}>Toggle Theme</button>
        </div>
    )
}

export default Profile