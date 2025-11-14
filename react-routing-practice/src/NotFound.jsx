import { Link } from "react-router-dom"

function NotFound(){
    return(
        <div>
            <h2>404 - page not found</h2>
            <p>The page you are looking for doesn't exist</p>
            <Link to="/">Go Home</Link>
        </div>
    )
}

export default NotFound