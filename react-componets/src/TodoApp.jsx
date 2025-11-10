import { useState } from "react"

function TodoApp(){
    const [task,setTask] = useState("")
    const [tasks,setTasks] = useState([])

    const addTask = () => {
        if(task.trim()!==""){
            setTasks([...tasks,task])
            setTask("")
        }else{
            alert('Please enter the task first')
        }
    }

    const deleteTask = (ind) => {
        const newTasks = tasks.filter((item,i)=>i!=ind)
        setTasks(newTasks)
    }
    return(
        <div style={{textAlign:'center',fontSize:'20px'}}> 
            <h2>Todo List</h2>
            <input
                type="text"
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                placeholder="Enter task"
            />
            {" "}
            <button onClick={addTask}>Add</button>
            {tasks.length === 0 ? (
                <p>No tasks yet, Add a task above</p>
            ):(
                <ul style={{listStyle:"none",padding:0}}>
                    {tasks.map((t,ind)=>(
                        <li key={ind} style={{margin:"5px 0"}}>{t}{" "}
                            <button onClick={()=>deleteTask(ind)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}


        </div>
    )
}

export default TodoApp