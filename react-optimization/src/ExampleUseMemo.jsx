import { useMemo, useState } from "react"

const expensiveCalculation = (num) => {
    console.log('calculating...')
    for(let i =0;i<200000000;i++){
        // heavy work
    }
    return num*2
}

function ExampleUseMemo(){
    const [count,setCount] = useState(1)
    const [toggle,setToggle] = useState(false)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

    const double = useMemo(()=>expensiveCalculation(count),[count])
    // const double = expensiveCalculation(count)
    return(
        <div>
            <h3>Double: {double}</h3>
            <button onClick={()=>setCount(count+1)}>Increment</button>
            <button onClick={()=>setToggle(!toggle)}>Toggle</button>
            <br/>
            <br/>
            <input name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter name"/>
            <input name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter email"/>
        </div>
    )
}

export default ExampleUseMemo