import { useNavigate } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import AddCartBtn from "./AddCartBtn"

function Card ({product}){

    const navigate = useNavigate()

    return(
        <>
        <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
            <img className="product-card-cover" src={product.images[0]}/>
            <h2 className="product-card-title">{product.title} </h2>
            <p className="product-card-rating"><FaStar/> {product.rating} </p>
            <p className="product-card-price">${product.price} </p>
            <AddCartBtn disabled={product.stock === 0} product={product}/>
        </div>
        </>
    )
}

export default Card