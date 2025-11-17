import { useState } from "react"
import Child from "./Child"

function Parent(){
    const [input,setInput] = useState()
    console.log('Parent component')
    return(
        <div>
            <h1>Parent Component</h1>
            <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <Child/>
        </div>
    )
}

export default Parent