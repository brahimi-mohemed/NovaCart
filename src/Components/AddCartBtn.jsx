import { useContext } from "react"
import { CartContext, ToastContext } from "../App"

function AddCartBtn({product, quantity, disabled}){

    const {cart, dispatch} = useContext(CartContext)
    const {toast, setToast} = useContext(ToastContext)

    const handleClick = (e) => {
        e.stopPropagation()
        dispatch({type: "ADD_TO_CART", product: product, quantity: quantity})
        setToast({message: "✓ Added to Cart", type: "success"})
    }

    return (
        <>
        <button disabled={disabled} className={`add-toCart-btn ${disabled ? "out-of-stock" : "in-stock"}`}  
            onClick={handleClick}>
            {disabled ? "Out of Stock" : "Add to Cart"}
        </button>
        </>
    )
}

export default AddCartBtn