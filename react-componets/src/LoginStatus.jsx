function LoginStatus() {

    // with if else statement
    // const isLoggedIn = false
    // if(isLoggedIn){
    //     return <h2>Welcome to this Platform</h2>
    // }else{
    //     return <h2>Please log in to continue</h2>
    // }

    // with ternary operator
    // const isLoggedIn = true
    // return (
    //     <div>
    //         <h2>{isLoggedIn ? "Welcome to this platform" : "Please log in to continue"}</h2>
    //     </div>
    // )

    // with logical AND operator
    const isLoggedIn = true
    return(
        <div>
            {isLoggedIn && <h2>Welcome to this platform</h2>}
            {!isLoggedIn && <h2>Please log in to continue</h2>}
        </div>
    )
}

export default LoginStatus