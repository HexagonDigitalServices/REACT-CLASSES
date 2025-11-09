import React from 'react'

class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state = {count:0}
    }
    render(){
        return(
            <div>
                <h2>Hello, {this.props.name}</h2>
                <p>Count: {this.state.count}</p>
                <button onClick={()=>this.setState({count:this.state.count+1})}>Increment</button>
            </div>
        )
    }
}

export default Welcome