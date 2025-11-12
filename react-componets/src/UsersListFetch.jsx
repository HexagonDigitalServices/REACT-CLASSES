import { useEffect, useState } from "react"

function UsersListFetch(){

    const [users,setUsers] = useState([])
    const [loading,setLoding] = useState(true)
    const [error,setError] = useState("")

    useEffect(()=>{
        setTimeout(() => {
            
            fetch('https://jsonplaceholder.typicode.com/users')
            .then((res)=>{
                if(!res.ok){
                    throw new Error("failed to fetch users")
                }
                return res.json()
            })
            .then((data)=>{
                setUsers(data)
                setLoding(false)
            })
            .catch((err)=>{
                setError(err.message)
                setLoding(false)
            })
        }, 3000);
    },[])
    
    if(loading) return <h3>Loading Users</h3>
    if(error) return <h3 style={{color:'red'}}>Error: {error}</h3>

    return(
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user)=>(
                    <li key={user.id}>{user.name}-{user.email}</li>
                ))}
            </ul>
        </div>
    )

}

export default UsersListFetch