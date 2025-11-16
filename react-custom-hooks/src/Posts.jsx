import useFetch from "./useFetch"

function Posts() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')

    if(loading) return <h3 style={{color:"yellow"}}>Loading...</h3>
    if(error) return <h3 style={{color:"red"}}>{error}</h3>
    return (
        <ul>
            {data.map((d)=>(
                <li key={d.id}>{d.title}</li>
            ))}
        </ul>
    )
}

export default Posts