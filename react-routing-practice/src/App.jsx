import { BrowserRouter, Routes, Route,Link } from "react-router-dom"

import Home from "./Home"
import Projects from "./Projects"
import ProjectDetail from "./ProjectDetail"
import Contact from "./Contact"
import NotFound from "./NotFound"

function App() {

  return (
    <BrowserRouter>
    <div>
      <header className="nav">
        <h1 className="brand">My Portfolio</h1>
        <nav className="liks">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/projects/:id" element={<ProjectDetail/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>

      <footer className="footer">
        <p>@ankit</p>
      </footer>
    </div>
    </BrowserRouter>
  )
}

export default App
