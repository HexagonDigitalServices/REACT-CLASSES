import { Link, useParams } from "react-router-dom"

const projects = [
    { id: "p1", title: "Portfolio Website", short: "MERN stack based portfolio", tech: ['react', 'node', 'express', 'MongoDB'], link: '#' },
    { id: "p2", title: "E-Com Website", short: "MERN stack based E-Com", tech: ['react', 'node', 'express', 'MongoDB'], link: '#' },
    { id: "p3", title: "EduTech Website", short: "MERN stack based EduTech", tech: ['react', 'node', 'express', 'MongoDB'], link: '#' }
]

function ProjectDetail(){
    const {id} = useParams()
    console.log(id)
    const project = projects.find((p)=>p.id === id)
    return(
        <div className="Project-detail">
            <h2>{project.title}</h2>

            <p>{project.short}</p>
            <h4>Tech Stack</h4>
            <ul>
                {project.tech.map((t)=>(
                    <li key={t}>{t}</li>
                ))}
            </ul>
            <p>
                <a href={project.link}>Live/ Repo link</a>
            </p>
            <Link to="/projects" className="btn">Back to projects page</Link>
        </div>
    )
}

export default ProjectDetail