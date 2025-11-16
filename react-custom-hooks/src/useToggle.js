import { useState } from "react"

function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue)

    const toggle = () => {
        setValue((prev) => !prev)
    }

    return [value, toggle]
}

export default useToggle