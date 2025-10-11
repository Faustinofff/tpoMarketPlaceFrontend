import { useState } from "react";
import Todo from "./Todo";

const Form = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

        const handleChange = (e) => setTodo(e.target.value);

        const handleClick = () => {
            if(todo.trim() === '') {
                alert('El campo no puede estar vacio');
                return;
            }
            setTodos([...todos, { todo}]);
            console.log(todos);
        }

        const deleteTodo = (index) => {
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
            console.log(deleteTodo);
        }

        return (
            <>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Agregar tarea</label><br />
                <input type="text" name="todo" onChange={handleChange} />
                <button onClick={handleClick}>Agregar</button>
            </form>
            {todos.map((value, index) => (
                <Todo todo={value.todo} key={index} index={index} deleteTodo={deleteTodo} />
            ))}
        </>
    );
}

export default Form;
