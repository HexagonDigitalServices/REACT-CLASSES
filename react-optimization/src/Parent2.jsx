import { useCallback, useState } from "react"
import Child2 from "./Child2"

function Parent2(){
    const [count,setCount] = useState(0)

    const handleclick = useCallback(() =>{
        setCount(count+1)
        console.log('clicked')
    },[])

    return <Child2 onclick={handleclick}/>
}

export default Parent2