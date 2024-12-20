import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

let TodosPage = () => {
    let [user, setUser] = useState(null);
    let [todos, setTodos] = useState([]);
    let [filteredTodos, setFilteredTodos] = useState([]);
    let [currentTodo, setCurrentTodo] = useState({
        title: "",
        description: "",
        isDone: false,
        timeEstimate: "",
        category: "Hälsa",
        deadline: ""
    })

    let [filter, setFilter] = useState({
        isDone: null,
        categories: [],
        sortBy: "deadline",
        sortOrder: "asc"
    })

    let { todoId } = useParams();
    let navigate = useNavigate();
    let categories = ["Hälsa", "Hushåll", "Jobbrelaterat", "Nöje"];

    useEffect(() => {
        let storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/");
        }

        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(savedTodos);
    }, [navigate]);

    useEffect(() => {
        if (todoId) {
            const editingTodo = todos.find(todo => todo.id === parseInt(todoId));
            if (editingTodo) {
                setCurrentTodo({ ...editingTodo });
            }
        }
    }, [todoId, todos]);

    useEffect(() => {
        applyFilters();
    }, [filter, todos]);

    let applyFilters = () => {
        let filtered = [...todos];

        if (filter.isDone !== null) {
            filtered = filtered.filter(todo => todo.isDone === filter.isDone);
        }

        if (filter.categories.length > 0) {
            filtered = filtered.filter(todo => filter.categories.includes(todo.category));
        }

        if (filter.sortBy === "deadline") {
            filtered.sort((a, b) => {
                let dateA = new Date(a.deadline);
                let dateB = new Date(b.deadline);
                return filter.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            })
        } else if (filter.sortBy === "timeEstimate") {
            filtered.sort((a, b) => filter.sortOrder === "asc" ? a.timeEstimate - b.timeEstimate : b.timeEstimate - a.timeEstimate);
        } else if (filter.sortBy === "isDone") {
            filtered.sort((a, b) => filter.sortOrder === "asc" ? a.isDone - b.isDone : b.isDone - a.isDone);
        }

        setFilteredTodos(filtered);
    }

    let onSubmit = (e) => {
        e.preventDefault();
        if (!currentTodo.title.trim()) return;

        let todoToSave = {
            id: todoId ? parseInt(todoId) : Date.now(),
            ...currentTodo
        }

        if (todoId) {
            setTodos(todos.map(todo => (todo.id === todoToSave.id ? todoToSave : todo)));
        } else {
            setTodos([...todos, todoToSave]);
        }

        localStorage.setItem("todos", JSON.stringify(todoId ? todos.map(todo => (todo.id === todoToSave.id ? todoToSave : todo)) : [...todos, todoToSave]));

        setCurrentTodo({ title: "", description: "", isDone: false, timeEstimate: "", category: "Hälsa", deadline: "" });
        navigate("/todos");
    }

    let deleteTodo = (id) => {
        let updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        navigate("/todos");
    }

    let toggleCompletion = (id) => {
        let updatedTodos = todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    let handleFilterChange = (filterType, value) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            [filterType]: value
        }))
    }

    let handleCategoryChange = (category) => {
        setFilter(prevFilter => {
            let categories = prevFilter.categories.includes(category)
                ? prevFilter.categories.filter(c => c !== category)
                : [...prevFilter.categories, category];
            return { ...prevFilter, categories };
        });
    };

    let handleSortChange = (sortBy) => {
        let newSortOrder = filter.sortBy === sortBy && filter.sortOrder === "asc" ? "desc" : "asc";
        setFilter(prevFilter => ({
            ...prevFilter,
            sortBy,
            sortOrder: newSortOrder
        }))
    }

    if (!user) return null;

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial", textAlign: "center" }}>
            <h2>{todoId ? "Redigera ärende" : "Lägg till nytt ärende"}</h2>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Titel"
                    value={currentTodo.title}
                    onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
                />
                <textarea
                    placeholder="Beskrivning"
                    value={currentTodo.description}
                    onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
                />
                <select
                    value={currentTodo.isDone ? "true" : "false"}
                    onChange={(e) => setCurrentTodo({ ...currentTodo, isDone: e.target.value === "true" })}
                >
                    <option value="false">Ej utförd</option>
                    <option value="true">Utförd</option>
                </select>
                <input
                    type="text"
                    placeholder="Tidsestimat"
                    value={currentTodo.timeEstimate}
                    onChange={(e) => setCurrentTodo({ ...currentTodo, timeEstimate: e.target.value })}
                />
                <select
                    value={currentTodo.category}
                    onChange={(e) => setCurrentTodo({ ...currentTodo, category: e.target.value })}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={currentTodo.deadline}
                    onChange={(e) => setCurrentTodo({ ...currentTodo, deadline: e.target.value })}
                />
                <button type="submit">
                    {todoId ? "Uppdatera ärende" : "Lägg till ärende"}
                </button>
            </form>

            <div>
                <h3>Filtrera</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.isDone === true}
                        onChange={() => handleFilterChange("isDone", filter.isDone === true ? null : true)}
                    />
                    Utförd
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.isDone === false}
                        onChange={() => handleFilterChange("isDone", filter.isDone === false ? null : false)}
                    />
                    Ej utförd
                </label>

                <h4>Kategorier</h4>
                {categories.map(category => (
                    <label key={category}>
                        <input
                            type="checkbox"
                            checked={filter.categories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />
                        {category}
                    </label>
                ))}

                <h4>Sortera</h4>
                <button className="deadline-btn" onClick={() => handleSortChange("deadline")}>Sortera efter Deadline</button>
                <button onClick={() => handleSortChange("timeEstimate")}>Sortera efter Tidsestimat</button>
                <button onClick={() => handleSortChange("isDone")}>Sortera efter Status</button>
            </div>

            {!todoId && (
                <ul className="todo-card-container">
                    {filteredTodos.map(todo => (
                        <li className="todo-card" key={todo.id}>
                            <h4>{todo.title}</h4>
                            <p>{todo.description}</p>
                            <p>{todo.isDone ? "Utförd" : "Ej utförd"}</p>
                            <p>{todo.timeEstimate}</p>
                            <p>{todo.category}</p>
                            <p>{todo.deadline}</p>
                            <button onClick={() => navigate(`/todos/${todo.id}`)}>Redigera</button>
                            <button onClick={() => toggleCompletion(todo.id)}>
                                {todo.isDone ? "Markera som Ej utförd" : "Markera som Utförd"}
                            </button>
                            <button onClick={() => deleteTodo(todo.id)}>Ta bort</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TodosPage;