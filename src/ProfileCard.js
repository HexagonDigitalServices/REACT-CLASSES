// function ProfileCard(props){
//     return(
//         <div className="card" style={{alignItems:"center",backgroundColor:"whitesmoke",color:"black",padding:"50px",margin:"50px"}}>
//             <img scr={props.image} alt={props.name}/>
//             <h3>{props.name}</h3>
//             <p>{props.desc}</p>
//         </div>
//     )
// }

// function ProfileCard({name,desc,image}){
//     return(
//         <div className="card" style={{alignItems:"center",backgroundColor:"whitesmoke",color:"black",padding:"50px",margin:"50px"}}>
//             <img scr={image} alt={name}/>
//             <h3>{name}</h3>
//             <p>{desc}</p>
//         </div>
//     )
// }


function ProfileCard({name,desc,image}){
    return(
        <div className="card" style={{alignItems:"center",backgroundColor:"whitesmoke",color:"black",padding:"50px",margin:"50px"}}>
            <img scr={image} alt={name}/>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    )
}

export default ProfileCard