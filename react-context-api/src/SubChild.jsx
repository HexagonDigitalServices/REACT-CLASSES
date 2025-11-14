import { useContext } from "react"
import UserContext from "./UserContext"

function SubChild(){
    const {user} = useContext(UserContext)
    return(
        <div>
            <h2>SubChild Component</h2>
            <p>{user}</p>
        </div>
    )
}

export default SubChild