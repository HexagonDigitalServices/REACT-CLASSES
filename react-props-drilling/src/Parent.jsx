import Child from "./Child"

function Parent({user}){
    return (
        <div>
            <h2>Parent Component</h2>
            {/* <p>{user}</p> */}
            <Child user={user}/>
        </div>
    )
}

export default Parent