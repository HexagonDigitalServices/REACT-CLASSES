import { useEffect, useState } from "react"

function TimerExample(){
    const [seconds,setSeconds] = useState(0)
    useEffect(()=>{
        const timer = setInterval(()=>{
            setSeconds((prev)=>prev+1)
        },1000)

        return ()=>{
            clearInterval(timer)
            console.log("timer cleaned up")
        }
    },[])
    return(
        <h2>Timer: {seconds}</h2>
    )
}

export default TimerExample