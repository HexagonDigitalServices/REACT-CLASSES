import { useState } from "react"

function FormInputs(){

    const [feedback,setFeedback] = useState("")
    const [rating,setRating] = useState("3")
    const [agree,setAgree] =useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(agree){
            alert(`Feedback: ${feedback}, Rating: ${rating}`)
        }else{
            alert('you must agree before submitting')
        }
    }
    return(
        <div>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="3"
                    placeholder="Write your feedback"
                    value={feedback}
                    onChange={(e)=>setFeedback(e.target.value)}
                />
                <br/><br/>
                <label>Rate us:</label>
                <select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>   
                </select>
                <br/><br/>
                <label>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e)=>setAgree(e.target.checked)}
                        />
                        I agree to the terms
                </label>
                <br/><br/>
                <button type="submit">Feedback</button>
            </form>
        </div>
    )
}

export default FormInputs