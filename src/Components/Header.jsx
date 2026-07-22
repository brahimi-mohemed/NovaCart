import { NavLink } from "react-router-dom"
import cartIcon from "../Assets/cart.svg"
import { useContext } from "react"
import { CartContext } from "../App"


function Header(){

    const {cart} = useContext(CartContext)
    const itemsNumber = cart.reduce((a, b) => a + b.quantity, 0)


    return(
        <header>
            <nav className="nav-bar">
                <NavLink to={"/"}>
                    <p className="brand-logo">NovaCart</p>
                </NavLink>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/Products"}>Products</NavLink>
                <NavLink to={"/About"}>About</NavLink>
                <NavLink to={"/Cart"} className="cart-icon">
                    <img src={cartIcon}></img>
                    <span>{itemsNumber} </span>
                </NavLink>
            </nav>
        </header>
    )

}

export default Header