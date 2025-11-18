import { useEffect, useState } from "react"

function Search(){
    const [query,setQuery] = useState('')
    const [products,setProducts] = useState([])

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then(res=>res.json())
            .then(data=>setProducts(data.products))
        },500)

        return () => clearTimeout(timeout)
    },[query])

    return(
        <div>
            <h2>Search Functionality</h2>
            <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search..."/>
            <ul>
                {products.map(p=>(
                    <li key={p.id}>{p.id} -{p.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Search