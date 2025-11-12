// import { useState } from "react"

import { useState } from "react"

// function ReactInput(){

//     const [name,setName] = useState("")
//     return (
//         <div>
//            <h2>Controlled Input Example</h2>
//            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter your name"/>
//             <p>your name: {name}</p>
//         </div>
//     )
// }

// export default ReactInput


function ReactInput(){

    // const [name,setName] = useState("")
    // const [email,setEmail] = useState("")
    const [formData,setFormData] =useState({name:"",email:""})
    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }
    return (
        <div>
            <h2>Multi-Input Form</h2>
            <input
                type="text"
                name="name"
                // value={name}
                value={formData.name}
                placeholder="Enter your name"
                // onChange={(e)=>setName(e.target.value)}
                onChange={handleChange}
            />
            <br/><br/>
            <input
                type="email"
                name="email"
                // value={email}
                value={formData.email}
                placeholder="Enter your email"
                // onChange={(e)=>setEmail(e.target.value)}
                onChange={handleChange}
            />
            {/* <p>Name: {name} <br/> Email: {email}</p> */}
            <p>Name: {formData.name} <br/> Email:{formData.email}</p>
        </div>
    )
}

export default ReactInput