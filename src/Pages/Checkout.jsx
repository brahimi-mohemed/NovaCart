import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext, ToastContext } from "../App"

function Checkout(){
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    const navigate = useNavigate()
    const { cart, dispatch } = useContext(CartContext)
    const { toast, setToast } = useContext(ToastContext)

    const itemsNumber = cart.reduce((a ,b) => a + b.quantity, 0)
    const totalExpense = cart.reduce((a, b) => a + (b.price * b.quantity), 0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(formData).some(value => value === "")) {
            alert("Please fill in all fields before placing the order.")
            return
        }
        setFormData(initialFormData)
        dispatch({ type: "CLEAR" })
        setToast({message: "✓ Order placed successfully", type: "success"})
        navigate("/confirmation")
    }

    if (cart.length === 0) {
        return (
            <section className="checkout-empty">
                <h1>Your Cart Is Empty</h1>
                <p>Please add items to your cart before proceeding to checkout.</p>
                <button onClick={() => navigate('/products')}>Continue Shopping</button>
            </section>
        )
    }

    return (
        <>
        <section className="checkout-heading">
            <h1>Checkout</h1>
        </section>

        <section className="checkout-container">
            <form className="checkout-form" id="checkout-form">
            <h2>Shipping Information</h2>
                <label>
                    <span>First Name</span>
                    <input placeholder="John" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} type="text"/>
                </label>

                <label>
                    <span>Last Name</span>
                    <input placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} type="text"/>
                </label>

                <label>
                    <span>Email</span>
                    <input placeholder="john.doe@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email"/>
                </label>

                <label>
                    <span>Phone</span>
                    <input placeholder="0123456789" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} type="tel"/>
                </label>

                <label>
                    <span>Address</span>
                    <input placeholder="123 Main St" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} type="text"/>
                </label>

                <label>
                    <span>City</span>
                    <input placeholder="New York" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} type="text"/>
                </label>

                <label>
                    <span>Postal Code</span>
                    <input placeholder="10001" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} type="number"/>
                </label>

                <label>
                    <span>Country</span>
                    <input placeholder="USA" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} type="text"/>
                </label>
            </form>

            <section className="order-summary">
                <h2>Order Summary</h2>
                <span>Items: {itemsNumber} </span>
                <span>Subtotal: ${totalExpense.toFixed(2)} </span>
                <span>Shipping: Free</span>
                <span>Total: ${totalExpense.toFixed(2)} </span>
                <button onClick={handleSubmit} type="submit" form="checkout-form">Place Order</button>
            </section>
        </section>
        </>
    )
}

export default Checkout