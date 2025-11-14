import SubChild from "./SubChild"

function Child({user}){
    return(
        <div>
            <h2>Child Component</h2>
            {/* {user} */}
            <SubChild user={user}/>
        </div>
    )
}

export default Child