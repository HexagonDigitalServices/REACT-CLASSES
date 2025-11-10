function FruitsList(){
     const fruits = ["Apple","Banana","Orange","Grapes"]
    return(
        <div>
            <h2>Fruits List</h2>
            <ul>
                {fruits.map((fruit,index)=>(
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
        </div>
    )
}

export default FruitsList