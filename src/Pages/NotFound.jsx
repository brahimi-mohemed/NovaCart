import { useNavigate } from "react-router-dom"

function NotFound(){
    const navigate = useNavigate()

    return (
        <>
        <section className="Not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you're looking for doesn't exist or may have been moved.</p>
            <div className="div">
                <button onClick={() => navigate('/')} className="back-btn">Go Home</button>
                <button onClick={() => navigate("/products")} className="back-btn">Browse Products</button>
            </div>
        </section>
        </>
    )

}

export default NotFound