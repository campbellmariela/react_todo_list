import React, {useState,useEffect} from "react";
import "./App.css";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);

    // Save new todo into localstorage
    useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
          setTodos(loadedTodos);
        }
    }, []);
    
    useEffect(() => {
        if(todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    }, [todos]);

    // Add new todo
    function handleSubmit(e) {
        e.preventDefault();

        let todo = document.getElementById('todoAdd').value
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };
        if (newTodo.text.length > 0 ) {
            setTodos([...todos].concat(newTodo));
        } else {
            alert("Enter valid task");
        }
        document.getElementById('todoAdd').value = ""
    }
  
    // Delete todo
    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // Mark todo as complete
    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }  
    
    // Edit a todo
    function submitEdits(newtodo) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === newtodo.id) {
                todo.text = document.getElementById(newtodo.id).value;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }
  
    return(
        <div className ="App container">
            <h1>To-do List</h1>
            {/* Form to insert to-do */}
            <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-10">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="todoAdd" 
                        placeholder="Add a new task"
                    />
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mb-3 w-100">
                        Add To-do
                    </button>
                </div>
            </form>
            {todos.map((todo) =>
                <div className="todo row g-2" key={todo.id}>
                    <div className="todo-content col-auto">
                        <div>
                            {/* Checkbox for toggle complete */}
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="completed" 
                                checked={todo.completed} 
                                onChange={() => toggleComplete(todo.id)}
                            />
                        </div>
                        <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                            {/* if it is edit mode, display input box, else display text */}
                            {todo.id === todoEditing ? (
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id = {todo.id} 
                                    defaultValue={todo.text}
                                />) : (<div>{todo.text}</div>)
                            }
                        </div>
                    </div>                    
                    <div className="todo-actions col">
                        {/* if it is edit mode, allow submit edit, else allow edit */}
                        {todo.id === todoEditing ? (
                            <button className="btn btn-success" onClick={() => submitEdits(todo)}>
                                Submit Edits
                            </button>
                        ) : (
                            <button className="btn btn-warning" onClick={() => setTodoEditing(todo.id)}>
                                Edit
                            </button>
                        )}
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                    </div>
                </div> 
            )}
        </div>
    );
};

export default App;
