import { useState } from "react"
import Child1 from "./Child1"

function Parent1(){
    console.log("parent component")
    const [count,setCount] =useState(0)
    
    return(
        <div>
            <Child1 name="ankit"/>
            <button onClick={()=>setCount(count+1)}>Increase</button>
        </div>
    )
}

export default Parent1