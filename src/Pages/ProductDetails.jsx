import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom"
import AddCartBtn from "../Components/AddCartBtn";

function ProductDetails(){
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [isMobile, setIsMobile] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        const fetchProduct = async () => {
            setLoading(true)
            setError(false)
            try{
                const res = await fetch(`https://dummyjson.com/products/${id}`)
                if (!res.ok) throw new Error("Network Error, Product Details Not Found")
                const data = await res.json()
                setProduct(data)
                setLoading(false)
            }
            catch(error){
                setError(error)
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    
    useEffect(()=> {
        const handleResize = () => {
            if (window.innerWidth <= 800){
                setIsMobile(true)
            }
            else{
                setIsMobile(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const decrement = () => {
        if (quantity === 1) return;
        setQuantity(q => q - 1)}

    const increment = () => {
        if (quantity === product?.stock) return
        setQuantity(q => q + 1)
    }
    return(
        <>
        <div className="details-heading">
            <h1>Product details</h1>
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span>›</span>
                <Link to="/products">Products</Link>
                <span>›</span>
                <span>{product?.title}</span>
            </div>
        </div>
        <button className="back-btn" onClick={() => navigate('/products')}>← Back to Products</button>

        {
        error ? <p className="txt-msg">{error.message} </p> :
            <>
            {loading ? <p className="txt-msg">Loading...</p> :
            <>
            <div className="product-details-container">
                {!isMobile && <img className="product-img" src={product.images[0]}/>}
                <div className="product-info">
                    <h2 className="title">{product.title}</h2>
                    {isMobile && <img className="product-img" src={product.images[0]}/>
                    }
                    <p className="category">{product.category} </p>
                    <p className="rating"><FaStar/> {product.rating} ({product.reviews.length} customer reviews) </p>
                    <p className="price">${product.price} </p>
                    <p className="brand">Brand: {product.brand || "Unknown"}</p>
                    <p className={`stock`}>
                    {product.stock > 0
                        ? `🟢 ${product.stock} in stock`
                        : "🔴 Out of stock"}
                    </p>
                    <h3>Description</h3>
                    <p className="description">{product.description} </p>

                    <h4>Quantity</h4>
                    <div className="quantity-control">
                        <button onClick={decrement}>-</button>
                        <span>{quantity} </span>
                        <button onClick={increment}>+</button>
                    </div>
                    <AddCartBtn disabled={product.stock === 0} product={product} quantity={quantity} />
                </div>
            </div>
            </>}
            </>
        }
        </>
    )

}

export default ProductDetails