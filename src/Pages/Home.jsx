import heroImage from "../Assets/hero-image.webp"
import Card from "../Components/Card"

import phoneImage from "../Assets/smartphone4.jpg"
import laptopImage from "../Assets/laptop3.jpg"
import fornitureImage from "../Assets/forniture1.jpg"
import beautyImage from "../Assets/beauty1.jpg"
import groceryImage from "../Assets/grocery2.jpg"
import homeImage from "../Assets/home5.jpg"
import { Link } from "react-router-dom"

function Home({products, error}){

    const featuredProducts = products.slice(0, 4)

    const categories = [
        {
            category :"Smartphones",
            image :phoneImage
        },
        {
            category :"Laptops",
            image : laptopImage
        },
        {
            category :"Furniture",
            image :fornitureImage
        },
        {
            category :"Beauty",
            image :beautyImage
        },
        {
            category :"Groceries",
            image :groceryImage
        },
        {
            category :"HomeDecoration",
            image :homeImage
        }
    ]

    return(
        <>
        <section id="hero">
            <img src={heroImage} />
            <div className="hero-content">
                <h1 className="hero-title">Modern Shopping Made Simple.</h1>
                <p className="hero-description">Browse quality products across multiple categories through a fast, clean, and responsive shopping experience.</p>
                <a href="/Products" className="hero-CTA-btn">Shop Now</a>
            </div>
        </section>

        <section id="features">
            <div className="features-titles">
                <h2>Featured Products</h2>
                <a href="/Products">View All Products</a>
            </div>
                {error && <p className="txt-msg">{error.message} </p>}
            <div className="features-container">
                {featuredProducts.map((product, index) => (
                    <Card key={index} product={product}/>
                ) )}
            </div>
        </section>

        <section id="categories">
                <h2>Shop by Category</h2>
                <div className="categories-container">
                    {categories.map((category, index) => (
                        <Link key={index} to={`/products?category=${category.category.toLocaleLowerCase()}`}>
                        <div  className="category-card">
                            <img src={category.image} className="category-cover"/>
                            <p className="category-title">{category.category}</p>
                        </div>
                        </Link>
                    ))}
                </div>
        </section>

        <section id="trust">
            <h2>Our Values</h2>
            <div className="values-container">
                <div className="value-card">
                    Quality
                </div>
                <div className="value-card">
                    Simplicity
                </div>
                <div className="value-card">
                    Innovation
                </div>
                <div className="value-card">
                    trust
                </div>
            </div>
        </section>
        </>
    )


}

export default Home