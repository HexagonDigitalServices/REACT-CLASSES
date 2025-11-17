import React, { useState, useEffect, useMemo, useCallback } from "react"
import Child from "./Child"

function App() {
  const [count, setCount] = useState(0)
  const [dark, setDark] = useState(false)

  const expensiveValue = useMemo(() => {
    console.log("running expenisive calculation...")
    let num = 0;
    for (let i = 0; i < 200000; i++) {
      num += 1
    }
    return num + count
  }, [count])

  const increment = useCallback(() => setCount((c) => c + 1), [])
  const toggleTheme = useCallback(() => setDark((d) => !d), [])

  const themeStyles = {
    padding: "20px",
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black',
    borderRadius: 10
  }

  return (
    <div style={themeStyles}>
      <h2>Optimized Counter</h2>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={toggleTheme} style={{ marginLeft: 10 }}>Toggle Theme</button>
      <Child count={count} increment={increment}/>
    </div>
  )
}

export default App
