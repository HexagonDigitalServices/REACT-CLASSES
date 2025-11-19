import { useReducer } from "react"
import CounterReducer from "./CounterReducer"

function UseReducer(){
    const [count,dispatch] = useReducer(CounterReducer,0)
    return(
        <>
            <h2>count:{count}</h2>
            <button onClick={()=>dispatch({type:"INC"})}>increment</button>
            <button onClick={()=>dispatch({type:"DEC"})}>Decrement</button>
        </>
    )
}

export default UseReducer