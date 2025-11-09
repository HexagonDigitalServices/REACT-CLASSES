import { useState } from "react";

function CounterApp(){
    const [count,setCount] =useState(0)
    return(
        <div style={{textAlign:"center",marginTop:"50px"}}>
            <h2>Counter: {count}</h2>
            <button style={{margin:"10px"}} onClick={()=>setCount(count+1)}>+</button>
            <button style={{margin:"10px"}} onClick={()=>setCount(count-1)}>-</button>
            <button style={{margin:"10px"}} onClick={()=>setCount(0)}>Reset</button>
        </div>
    )
}

export default CounterApp