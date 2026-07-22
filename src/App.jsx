import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useReducer, createContext } from "react";
import Layout from "./Layouts/Layout"
import Home from "./Pages/Home"
import Products from "./Pages/Products"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"
import About from "./Pages/About"
import NotFound from "./Pages/NotFound"
import Checkout from "./Pages/Checkout"
import Confirmation from "./Pages/Confirmation"

export const CartContext = createContext()
export const ToastContext = createContext()

const reduce = (state, action) => {
  switch (action.type){
    case "ADD_TO_CART":{
      const targetItem = state.find(item => item.id === action.product.id)
      
      if (targetItem) {
        return state.map((i) => {
          if (i.id !== targetItem.id) return i;
          
          return {...i, quantity: i.quantity + (action.quantity || 1)}
        })
      }

      const newItem = {
        id: action.product.id,
        title: action.product.title,
        price: action.product.price,
        img: action.product.images[0],
        quantity: action.quantity || 1
      }
      return [...state, newItem]
    }

    case "DECREASE":{
      if (action.product.quantity === 1) {
        return state.filter(item => item.id !== action.product.id)
      }

      return state.map(item => {
        if (item.id !== action.product.id) return item;

        return {...item, quantity: item.quantity - 1}
    })
    }

    case "INCREASE":{
      return state.map(item => {
        if (item.id !== action.product.id) return item;

        return {...item, quantity: item.quantity + 1}
    })
    }

    case "REMOVE" :{
      return state.filter(item => item.id !== action.id)
    }

    case "CLEAR":{
      return []
    }

    default :
      return state;
  }

}

function App() {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [toast, setToast] = useState(null)
  const [error, setError] = useState(null)
  const [cart, dispatch] = useReducer(reduce, savedCart)
  const location = useLocation()

  useEffect(() =>{
    const fetchProducts = async () => {
      try {
        setError(null)
        const productsRes = await fetch("https://dummyjson.com/products?limit=0")

        if (!productsRes.ok) throw new Error("Network Error, Products Not Found!");
        
        const productsData = await productsRes.json()
        
        const categoriesRes = await fetch("https://dummyjson.com/products/categories")

        if (!categoriesRes.ok){
          throw new Error("Network Error, Categories Not Found!")
        }
        const categoriesData = await categoriesRes.json()
        
        setProducts(productsData.products)
        setCategories(categoriesData)
      }
      catch(error){
          setError(error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
    <ToastContext.Provider value={{toast, setToast}}>
    <CartContext.Provider value={{cart, dispatch}}>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home products={products} error={error} />} />
        <Route path="/Products" element={<Products error={error} products={products} categories={categories}/>} />
        <Route path="/Products/:id" element={<ProductDetails/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Checkout" element={<Checkout/>} />
        <Route path="/confirmation" element={<Confirmation/>} />
      </Route>

      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    </CartContext.Provider>
    </ToastContext.Provider>

    </>
  )
}

export default App
