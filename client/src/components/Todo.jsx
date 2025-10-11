const Todo = ({todo, index, deleteTodo}) => {
    return (
        <>
            <h3>{todo}</h3>
            <button onClick={() => deleteTodo(index)}>eliminar</button>
        </>
    )
}

export default Todo

