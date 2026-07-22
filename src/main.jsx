import React from 'react';
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import './Styles/Home.css'
import './Styles/Products.css'
import './Styles/ProductDetails.css'
import './Styles/Cart.css'
import './Styles/About.css'
import './Styles/Checkout.css'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
