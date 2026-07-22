import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext, ToastContext } from "../App"
import Products from "./Products"

function Cart(){
    const {cart, dispatch} = useContext(CartContext)
    const {toast, setToast} = useContext(ToastContext)
    const navigate = useNavigate()


    const itemsNumber = cart.reduce((a ,b) => a + b.quantity, 0)
    const totalExpense = cart.reduce((a, b) => a + (b.price * b.quantity), 0)


    const handleRemove = (id) => {
        dispatch({type: "REMOVE", id: id})
        setToast({message: "✓ Item removed from Cart", type: "warning"})
    }

    const handleClear = () => {
        if(!cart.length){
            setToast({message: "! The Cart Is Already Empty", type: "warning"})
            return
        }
        dispatch({type: "CLEAR"})
        setToast({message: "✓ Cart cleared", type: "info"})
    }

    return(
        <>
        <div className="cart-heading">
            <h1>Your Cart</h1>
        </div>
        <button className="back-btn" onClick={() => navigate('/products')}>← Continue Shopping</button>

        <div className="cart-container">

            <div className="cart-items">
                <div className="cart-header">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                    <button onClick={() => handleClear()} className="clear-btn">Clear</button>
                </div>
                {
                    !cart.length ? <p className="txt-msg">Your Cart Is Empty, Start Spending!</p> 
                    :cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="info">
                                <img src={item.img} />
                                <h3>{item.title}</h3>
                            </div>
                            <p>${item.price}</p>

                            <div className="controls">
                                <button onClick={() => dispatch({type: "DECREASE", product: item})}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => dispatch({type: "INCREASE", product: item})}>+</button>
                            </div>
                            <p>${(item.price * item.quantity).toFixed(2)} </p>
                            <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
                        </div>
                    ))
                }
            </div>

            <div className="cart-summary">
                <h2 className="summary-header">Order Summary</h2>
                <span>Items: {itemsNumber} </span>
                <span>Subtotal: ${totalExpense.toFixed(2)} </span>
                <span>Shipping: Free</span>
                <span>Total: ${totalExpense.toFixed(2)} </span>
                {cart.length > 0 && (
                    <button onClick={() => navigate("/Checkout")} className="checkout-btn">Checkout</button>
                )}
            </div>
        </div>
        </>
    )


}

export default Cart