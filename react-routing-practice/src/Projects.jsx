import { Link } from "react-router-dom"

const projects = [
    { id: "p1", title: "Portfolio Website", short: "MERN stack based portfolio", tech: ['react', 'node', 'express', 'MongoDB'], link: '#' },
    { id: "p2", title: "E-Com Website", short: "MERN stack based E-Com", tech: ['react', 'node', 'express', 'MongoDB'], link: '#' },
    { id: "p3", title: "EduTech Website", short: "MERN stack based EduTech", tech: ['react', 'node', 'express', 'MongoDB'], link: '#' }
]

function Projects() {
    return (
        <div>
            <h2>Projects</h2>
            <p>Below are some highlighted projects. click on any project to view details</p>
            <div className="cards">
                {projects.map((p) => (
                    <div key={p.id} className="card">
                        <h3>{p.title}</h3>
                        <p>{p.short}</p>
                        <div className="tags">
                            {p.tech.map((t)=>(
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                        <Link to={`/projects/${p.id}`} className="btn">View Details</Link>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Projects