import { useEffect, useState } from "react"

function InfiniteScroll(){
    const [products,setProducts] = useState([])
    const [page,setPage] =useState(1)
    const limit = 10

    useEffect(()=>{
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page-1)*limit}`)
            .then(res=>res.json())
            .then(data=>setProducts(prev=>[...prev,...data.products]))
    },[page])

    useEffect(()=>{
        const handleScroll= () =>{
            if(window.innerHeight+ window.scrollY >=document.body.scrollHeight -50){
                setPage(prev=>prev+1)
            }
        }
        window.addEventListener("scroll",handleScroll)
        return ()=> window.removeEventListener("scroll",handleScroll)
    },[])

    return (
        <div>
            <h2>Infine Scroll</h2>
            {products.map(p=>(
                <p key={p.id} style={{padding:10,borderBottom:"1px folid black"}}>{p.title}</p>
            ))}
            <p style={{textAlign:'center',padding:20,color:'gray'}}>Loading more....</p>
        </div>
    )
}

export default InfiniteScroll