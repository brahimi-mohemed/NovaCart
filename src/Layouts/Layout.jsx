import { Outlet } from "react-router-dom"
import Toast from "../Components/Toast"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

function Layout(){

    return(
        <>
        <Header></Header>
        <Toast/>
        <main>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Layout