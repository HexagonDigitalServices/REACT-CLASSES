import { useContext } from "react"
import AuthContext from "./AuthContext"

function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    return (
        <nav>
            <h3>My App</h3>
            {isLoggedIn ? (
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            ) : (
                <button onClick={() => setIsLoggedIn(true)}>Login</button>
            )}
        </nav>
    )
}

export default Navbar