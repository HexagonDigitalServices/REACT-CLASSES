import { useState } from "react";

function MessageDisplay(){
    const [show,setShow] = useState(false)
    return(
        <div>
            <button onClick={()=>setShow(!show)}>Toggle Message</button>
            {show && <p>This is a conditional message</p>}
        </div>
    )
}

export default MessageDisplay