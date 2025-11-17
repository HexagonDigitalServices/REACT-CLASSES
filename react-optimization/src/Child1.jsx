import React from "react"

function Child1({name}){
    console.log("child rendered")
    return <h3>Child component - {name}</h3>
}

export default React.memo(Child1)