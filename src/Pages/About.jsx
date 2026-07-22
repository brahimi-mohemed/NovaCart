import { useNavigate } from "react-router-dom"


function About(){

    const navigate = useNavigate()

    return(
        <>
        <section className="about-hero">
            <h1>About Us</h1>
            <h2>Discover Quality, Shop with Confidence</h2>
            <p>At Nova Store, we believe online shopping should be simple, enjoyable, and trustworthy. Our mission is to bring together carefully selected products that combine quality, value, and modern design—all in one convenient place. Whether you're searching for everyday essentials, the latest technology, beauty products, or home accessories, we're committed to providing a seamless shopping experience from browsing to checkout.</p>
        </section>

        <section className="about-story">
            <h2>Our Story</h2>
            <p>Nova Store was created with one goal in mind: making online shopping more accessible and enjoyable for everyone. We understand that customers want more than just products—they want reliability, transparency, and an experience they can trust. By focusing on quality, thoughtful design, and customer satisfaction, we aim to create a store that people enjoy coming back to.</p>
        </section>

        <section className="about-values">
            <h2>Our Values</h2>
            <div className="value-list">
                <div>
                    <h3>• Quality First</h3>
                    <p>Every product in our catalog is carefully selected to meet high standards of quality and reliability.</p>
                </div>
                <div>
                    <h3>• Customer Focus</h3>
                    <p>Our customers are at the center of everything we do. We strive to provide a smooth, secure, and enjoyable shopping experience.</p>
                </div>
                <div>
                    <h3>• Modern Experience</h3>
                    <p>From our intuitive interface to our responsive design, we believe online shopping should be fast, simple, and accessible on every device.</p>
                </div>
                <div>
                    <h3>• Trust & Transparency</h3>
                    <p>We value honesty, clear product information, and a shopping experience that customers can rely on.</p>
                </div>
            </div>
        </section>  

        <section className="about-cta">
            <h2>Ready to Explore?</h2>
            <h3>Discover products you'll love and experience shopping designed with you in mind.</h3>
            <p>Browse our collection today and find your next favorite product.</p>
            <button onClick={() => navigate('/products')}>Shop Now</button>
        </section>
        </>
    )

}

export default About