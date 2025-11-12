import { useEffect, useState } from "react"
import axios from "axios"

function PostById(){

    const [postId,setPostId] = useState(1)
    const [post,setPost] = useState({})

    // useEffect(()=>{
    //     axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    //         .then((res)=>setPost(res.data))
    //         .catch((err)=>console.log(err))
    // },[postId])

    useEffect(()=>{
       async function fetchData() {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        const data = res.data
        setPost(data)
       }
       fetchData()
    },[postId])

    return(
        <div>
            <h2>Fetch Post By ID</h2>
            <input
                type="number"
                min={1}
                max={50}
                value={postId}
                onChange={(e)=>setPostId(e.target.value)}
            />
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    )
}

export default PostById