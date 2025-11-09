// import Greeting from "./Greeting";
// import ProfileCard from "./ProfileCard";
// import Welcome from "./Welcome";

import { useState } from "react";
import CounterApp from "./Counter";

// function App() {
  // const name = 'ankit'
  // const age = 23
  // return (
  //   <div className="container">
  //     <div>
  //       <h1 style={{backgroundColor:"red", color:"white"}}>Hello {name}</h1>
  //     </div>
  //     <div>
  //       <h1 style={{backgroundColor:"red", color:'white',margin:"50px",padding:'30px'}}>Age is {age}</h1>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>Hello Ankit</h1>
  //     <Welcome name="ankit" age="23"/>
  //   </div>
  // )

  // return(
  //   <div style={{textAlign:"center",marginTop:"50px"}}>
  //     <Greeting name="ankit"/>
  //     <Greeting name="raj"/>
  //     <Greeting name ="John"/>
  //   </div>
  // )

  // return(
  //   <div>
  //     <ProfileCard name="Ankit Raj" image="https://placehold.co/400" desc="Full stack developer"/>
  //     <ProfileCard name="Navith Kumar" image="https://placehold.co/400" desc="FrontEnd Developer"/>
  //     <ProfileCard name="Nikita Raj" image="https://placehold.co/400" desc="Backend Developer"/>
  //   </div>
  // )
// }

function App(){
  // const [stateVarialbe,setStateVariable] = useState(initialValue)

  // const [count,setCount] = useState(0)
  // let count = 0

  // function handleClick(){
  //   alert("button clicked")
  // }

  // const [isVisible,setIsVisible] = useState(true)
  return(
    <div>
      {/* <p>You clicked {count}</p> */}
      {/* <button onClick={()=>setCount(count+1)}>click me</button> */}
      {/* <button onClick={()=>count = count +1}>click me</button> */}
      {/* <button onClick={handleClick}>Click me</button> */}
      {/* <button onClick={()=>alert("button is clicked")}>click me</button> */}

    {/* <button onClick={()=>setIsVisible(!isVisible)}>{isVisible?"Hide":"Show"}</button> */}
    {/* {isVisible && <p>Hello React</p>} */}

    <CounterApp/>
    </div>
  )
}

export default App;
