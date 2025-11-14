import { useContext } from "react"
import UserContext from "./UserContext"

function Home(){
    const {user} = useContext(UserContext)
    return(<h2>Welcome,{user}</h2>)
}

export default Home