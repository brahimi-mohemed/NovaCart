import { useContext, useState, useEffect, useRef } from "react"
import { ToastContext } from "../App"

function Toast(){

    const {toast, setToast} = useContext(ToastContext)
    const [visible, setVisible] = useState(false)
    const timerRef = useRef(null)
    
    useEffect(() => {
        if (!toast) return
        setVisible(true)
        clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            setVisible(false)
            timerRef.current = setTimeout(() => {
                setToast(null)
            }, 300)
        }, 5000)
        return () => clearTimeout(timerRef.current)

    }, [toast, setToast])
    
    if (!toast) return null

    return(
        <>
        <div id="toast" className={`toast-${toast.type} ${visible ? "visible" : ""}`}>
            <p>{toast.message}</p>
        </div>

        </>
    )

}

export default Toast