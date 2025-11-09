import { useState, useEffect } from "react"

function LifeCycleFunctional() {
    const [count, setCount] = useState(0)

    // similar to componentDidMount()
    // useEffect(()=>{
    //     console.log("mounted")
    // },[])

    // similar to componentDidUpdate()
    // useEffect(()=>{
    //     if(count>0){
    //         console.log("updated: count is now",count)
    //     }
    // },[count])

    // similar to componentWillUnmount
    // useEffect(()=>{
    //     return ()=>{
    //         console.log("component unmounted")
    //     }
    // },[])

    // similar to componentDidmount and componentWillUnmount - combined both
    // useEffect(() => {
    //     console.log("component mounted")
    //     return () => {
    //         console.log("component unmounted")
    //     }
    // }, [])

    return (
        <div>
            <h2>Functional Lifecycle Demo</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

export default LifeCycleFunctional