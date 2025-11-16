import useToggle from "../hooks/useToggle"

function ToggleFAQ(){
    const [open,toggleOpen] = useToggle()

    return(
        <div className="card">
            <h3>FAQ Toggle</h3>
            <button onClick={toggleOpen} className="btn">
                {open? "Hide Answer":"Show Answer"}
            </button>
            {open && (
                <p style={{marginTop:10}}>
                    This is the answer given by customers
                </p>
            )}
        </div>
    )
}

export default ToggleFAQ