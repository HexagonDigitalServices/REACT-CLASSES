import React from "react"

function Child2({onclick}){
    console.log('child rendered')
    return <button onClick={onclick}>Click</button>
}

export default Child2