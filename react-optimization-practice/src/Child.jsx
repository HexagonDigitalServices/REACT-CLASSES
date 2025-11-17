import React from "react";

function Child({count,increment}){
    console.log("child component rendered")
    return(
    <div>
        <h3>Child count: {count}</h3>
        <button onClick={increment}>increment</button>
    </div> 
    )
}

export default React.memo(Child)