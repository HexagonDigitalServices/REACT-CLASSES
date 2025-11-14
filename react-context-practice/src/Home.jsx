import { useContext } from "react"
import AuthContext from "./AuthContext"

function Home() {
    const { isLoggedIn, user } = useContext(AuthContext)
    if (isLoggedIn)
        return (<h3>{user}</h3>)
    else return <h3>Please Log in </h3>
}

export default Home