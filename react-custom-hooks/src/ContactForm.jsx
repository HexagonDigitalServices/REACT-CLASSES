import useForm from "./useForm"

function ContactForm(){
    const {form,handleChange,reset} = useForm({name:'',email:''})

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        reset()
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter name"/> <br/>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email"/> <br/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default ContactForm