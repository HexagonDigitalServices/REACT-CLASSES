import { useState } from "react"

function useForm(initialValue){
    const [form,setForm] = useState(initialValue)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setForm({
            ...form,
            [name]:value
        })
    }

    const reset = () =>setForm(initialValue)

    return {form, handleChange, reset}
}

export default useForm