import { Link } from "react-router-dom"

const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mobile" },
    { id: 3, name: "Headphone" }
]

function ProductList() {

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((p)=>(
                    <li key={p.id}>
                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList