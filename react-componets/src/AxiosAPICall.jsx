import { useEffect, useState } from "react"
import axios from "axios"

function AxiosAPICall(){

    const [posts,setPosts] =useState([])
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res)=>{
                setPosts(res.data)
                setLoading(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false)
            })
    },[])

    return(
        <div>
            <h2>Posts Lists</h2>
            {loading ? (
                <p>Loading....</p>
            ):(
                <ul>
                    {posts.map((post)=>(
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AxiosAPICall