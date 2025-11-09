import React from "react";

class LifeCycleDemo extends React.Component{
    constructor(){
        super()
        this.state = {count:0}
        console.log("Constructor - Mounting phase")
    }
    componentDidMount(){
        console.log("componentDidMount - Component mounted")
    }
    componentDidUpdate(){
        console.log("componentDidUpdate - Component Updated")
    }
    componentWillUnmount(){
        console.log("componentWillUnmount - Component Unmounted")
    }

    render(){
        console.log("Render method called")
        return (
            <div>
                <h2>Count: {this.state.count}</h2>
                <button onClick={()=>this.setState({count:this.state.count+1})}>Increment</button>
            </div>
        )
    }
}

export default LifeCycleDemo