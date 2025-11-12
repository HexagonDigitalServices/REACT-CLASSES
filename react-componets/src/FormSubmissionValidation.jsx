import { useState } from "react"

function FormSubmissionValidation(){

    const [formData, setFormData] = useState({email:"",password:""})
    const [error,setError] = useState("")

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!formData.email || !formData.password){
            setError("all fields are required")
        }else{
            setError("")
            alert(`Logged in as:${formData.email}`)
        }
    }
    return(
        <div style={{textAlign:'center',background:'gray'}}>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br/><br/>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br/><br/>
                {error && <p style={{color:'red'}}>{error}</p>}
           <p>Email: {formData.email} <br/> Password:{formData.password}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default FormSubmissionValidation