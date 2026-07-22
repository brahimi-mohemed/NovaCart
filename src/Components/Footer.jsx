function Footer(){

    return(
        <>
        <footer>
            <div className="footer-info">
                <div className="logo-container">
                    <h2>NovaCart</h2>
                    <p>Modern shopping made simple.</p>
                </div>
                <div className="navigation-container">
                    <h2>Navigation</h2>
                    <a href="/">Home</a>
                    <a href="/Products">Products</a>
                    <a href="/Cart">Cart</a>
                    <a href="/About">About</a>
                </div>
                <div className="contact-container">
                    <h2>Connect</h2>
                    {/*<a href="">LinkedIn</a>*/}
                    <a href="https://github.com/brahimi-mohemed" target="_blank">GitHub</a>
                </div>
            </div>

            <div className="footer-rights">
                <p>Built with React, Vite and React Router</p>
                <p>© 2026 NovaCart. All rights reserved.</p>
            </div>
        </footer>
        </>
    )

}

export default Footer