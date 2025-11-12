import { useState } from "react"

function FormSubmission(){

    const [formData, setFormData] = useState({username:"",email:"",password:""})
    
    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        alert(`Welcome ${formData.username} Your email is ${formData.email}`)
    }
    return(
        <div style={{textAlign:'center'}}>
            <h2>Signup Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your name"
                    value={formData.username}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br/><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default FormSubmission