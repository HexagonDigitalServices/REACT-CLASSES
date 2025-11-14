import { Link } from "react-router-dom"

function Home(){
    return(
        <div>
            <h2>Hi - I'm Ankit</h2>
            <p>I am a full stack developer specializing in MERN stack</p>
            <section>
                <h3>Featured work</h3>
                <p>Check out my projects and case studies: <Link to="/projects">View Projects</Link></p>
            </section>
        </div>
    )
}

export default Home