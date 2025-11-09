import { useState } from "react";

function CounterFunctional(){
    const [count,setCount] = useState(0)
    return(
        <div>
            <h3>Functional Counter: {count}</h3>
            <button onClick={()=>setCount(count+1)}>Increment</button>
        </div>
    )
}

export default CounterFunctional