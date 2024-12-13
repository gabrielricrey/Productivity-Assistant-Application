import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let TodosPage = () => {
    let [user, setUser] = useState(null)
    let [todos, setTodos] = useState([])
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [isDone, setIsDone] = useState(false);
    let [timeEstimate, setTimeEstimate] = useState("")
    let [category, setCategory] = useState("Hälsa")
    let [deadline, setDeadline] = useState("")
    let navigate = useNavigate()
    let categories = ["Hälsa", "Hushåll", "Jobbrelaterat", "Nöje"]

    // För att fånga id från URL när man redigerar ett specifikt ärende
    let { todoId } = useParams()

    useEffect(() => {
        let savedUser = sessionStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        } else {
            navigate("/")
        }

        // Om vi är på en specifik todo-sida (för att redigera)
        if (todoId) {
            const todoToEdit = todos.find(todo => todo.id === parseInt(todoId))
            if (todoToEdit) {
                setTitle(todoToEdit.title)
                setDescription(todoToEdit.description)
                setIsDone(todoToEdit.isDone)
                setTimeEstimate(todoToEdit.timeEstimate)
                setCategory(todoToEdit.category)
                setDeadline(todoToEdit.deadline)
            }
        }
    }, [navigate, todoId, todos])

    let handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return

        let newTodo = {
            id: todoId ? parseInt(todoId) : Date.now(),
            title,
            description,
            isDone,
            timeEstimate,
            category,
            deadline,
        };

        if (todoId) {
            // Uppdatera todo om vi är på redigeringssidan
            setTodos(todos.map(todo => (todo.id === newTodo.id ? newTodo : todo)))
        } else {
            // Lägg till nytt todo om vi är på huvudlistan
            setTodos([...todos, newTodo])
        }

        setTitle("")
        setDescription("")
        setIsDone(false)
        setTimeEstimate("")
        setCategory("Hälsa")
        setDeadline("")
        navigate("/todos")
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        navigate("/todos")
    }

    const toggleCompletion = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ))
    }

    if (!user) return null;

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
            <h2>{todoId ? "Redigera ärende" : "Lägg till nytt ärende"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    placeholder="Titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Beskrivning"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={isDone}
                    onChange={(e) => setIsDone(e.target.value === "true")}
                >
                    <option value="false">Ej utförd</option>
                    <option value="true">Utförd</option>
                </select>
                <input
                    placeholder="Tidsestimat"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">{todoId ? "Uppdatera ärende" : "Lägg till ärende"}</button>
            </form>

            {!todoId && (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <h4>{todo.title}</h4>
                            <p>{todo.description}</p>
                            <p>{todo.isDone ? "Utförd" : "Ej utförd"}</p>
                            <p>{todo.timeEstimate}</p>
                            <p>{todo.category}</p>
                            <p>{todo.deadline}</p>
                            <button onClick={() => navigate(`/todos/${todo.id}`)}>Redigera</button>
                            <button onClick={() => toggleCompletion(todo.id)}>
                                {todo.isDone ? "Markera som ej slutförd" : "Markera som slutförd"}
                            </button>
                            <button onClick={() => handleDelete(todo.id)}>Ta bort</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodosPage;
