import React, { useEffect, useState } from "react";

function UsersList() {

    const [users, setUsers] = useState([])
    const [count,setCount] = useState(0)

    // for mounting phase
    // useEffect(()=>{
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(res=> res.json())
    //         .then(data=>setUsers(data))
    //         .catch(err=> console.log(err))
    // },[])

    useEffect(() => {
        console.log("user list upated")
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }, [count])
    return (
        <div>
            <button onClick={()=>setCount(count+1)}>Increment</button>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li>{user.name}- {user.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default UsersList