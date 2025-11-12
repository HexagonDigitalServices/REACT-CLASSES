import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Login from "./Login"

function App() {
  return (
   <BrowserRouter>

    {/* <nav style={{display:"flex",gap:"20px", marginBottom:"20px"}}>
      <Link to="/home">Home</Link>
      <Link to="/home/1">Home-1</Link>
      <Link to="/home/2">Home-2</Link>

      <Link to="/about">About</Link>
      <Link to="/about/1">About-1</Link>
      <Link to="/about/2">About-2</Link>

      <Link to="/contact">Contact</Link>
      <Link to="/contact/1">Contact-1</Link>
      <Link to="/contact/2">Contact-2</Link>
    </nav>

    
    <Routes>
    <Route path="/about" element={<About/>}/>
    <Route path="/about/1" element={<h2>About 1</h2>}/>
    <Route path="/about/2"  element={<h2>About 2</h2>}/>
    </Routes>
    
    <Routes>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/contact/1" element={<h2>Contact 1</h2>}/>
    <Route path="/contact/2"  element={<h2>Contact 2</h2>}/>
    </Routes> */}
    
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/1" element={<h2>home 1</h2>}/>
      <Route path="/home/2"  element={<h2>Home 2</h2>}/>
    </Routes>

      <Login/>
   </BrowserRouter>
  )
}

export default App
