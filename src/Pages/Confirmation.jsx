function Confirmation(){
    return(
        <section className="confirmation">
            <h1>Order Confirmed</h1>
            <p>Thank you for your order!</p>
            <button onClick={() => window.location.href = '/'}>Return to Home</button>
        </section>
    )
}

export default Confirmation

