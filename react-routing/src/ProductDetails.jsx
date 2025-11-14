import { useParams } from "react-router-dom"

function ProductDetails(){
    const {id} = useParams()

    return( <h3>Showing details of product : {id}</h3>)
}

export default ProductDetails