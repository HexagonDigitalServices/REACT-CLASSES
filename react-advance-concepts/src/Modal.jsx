import ReactDom from "react-dom"

function Modal({children}){
    return ReactDom.createPortal(
        <div style={{background:"#0008",padding:20}}>
            {children}
        </div>,
        document.getElementById("modal-root")
    )
}

export default Modal