import useToggle from "./useToggle"

function ToggleExample(){

    const [value,toggle] = useToggle()

    return(
        <div>
            <button onClick={toggle}>
                {value? "Hide": "Show"} Details
            </button>

            {value && <p>Here are some Hidden details</p>}
        </div>
    )
}

export default ToggleExample