import useFetch from "../hooks/useFetch"

function UsersList(){
    const {data,loading,error} = useFetch('https://jsonplaceholder.typicode.com/users')

    return(
        <div className="card">
            <h3>Users List (useFetch)</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>{error}</p>}

            {!loading && !error && (
                <ul>
                    {data.map((u)=>(
                        <li key={u.id}>{u.name}- {u.email}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UsersList