import {useSelector,useDispatch} from "react-redux"
import {increment,decrement} from "./counterSlice"

function Counter(){
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch()

    return(
        <>
            <h2>Counter: {count}</h2>
            <button onClick={()=>dispatch(increment())}>increment</button>
            <button onClick={()=>dispatch(decrement())}>decrement</button>
        </>
    )
}

export default Counter