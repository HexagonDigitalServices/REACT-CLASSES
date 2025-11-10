import { useState } from "react";

function TaskList(){
    const [tasks,setTasks] = useState(["Learn React","Practice props","Do Mini Project","Learn React","Practice props","Do Mini Project"])
    return(
        <div>
            <h2>Task List</h2>
            {tasks.length>0 ? (
                <ul>
                    {tasks.map((task,index)=>(
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            ):(
                <p>No tasks available!</p>
            )}
        </div>
    )
}

export default TaskList