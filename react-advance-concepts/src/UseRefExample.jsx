import { useRef } from "react"

function UseRefExample(){
    const inputRef = useRef()

    function focusInput(){
        inputRef.current.focus()
    }

    return(
        <div>
            <input ref={inputRef} placeholder="Type here"/>
            <button onClick={focusInput}>Focus</button>
        </div>
    )
}

export default UseRefExample