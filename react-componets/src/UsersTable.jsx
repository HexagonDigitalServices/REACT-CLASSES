function UsersTable() {

    const users = [
        { id: 1, name: "ankit", age: 23 },
        { id: 2, name: "raj", age: 24 },
        { id: 3, name: "John", age: 30 },
        { id: 4, name: "ankit", age: 23 },
        { id: 5, name: "raj", age: 24 },
        { id: 6, name: "John", age: 30 },

    ]
    return (
        <div>
            <h2>User Details</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={`${user.id}-${user.name}`}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable