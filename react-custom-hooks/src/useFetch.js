import { useEffect } from "react";
import { useState } from "react";

function useFetch(apiUrl) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) throw new Error("API error")
                return res.json()
            })
            .then((result) => setData(result))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [apiUrl])

    return { data, loading, error }
}

export default useFetch