import { useEffect, useState } from "react"

function Pagination() {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const limit = 10

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, [page])

    return (
        <div>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>{p.id} - {p.price}</li>
                ))}
            </ul>

            <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
            <button onClick={() => setPage(p => p + 1)} >Next</button>
        </div>
    )
}

export default Pagination