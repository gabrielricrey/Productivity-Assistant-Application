import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodosPage = () => {

    let [user,setUser] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    const categories = ["Hälsa", "Hushåll", "Jobbrelaterat", "Nöje"]

function TodosPage() {
  const [todos, setTodos] = useState([])

  const addTodo = (newTodo) => {
    setTodos([todos, {id: Date.now(), newTodo}])
  }}

    

    return(
        <>
<Router>
      <div>
        <h1>Todo Lista</h1>
        <Link to="/create">Skapa ett nytt ärende</Link>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Link to={"/todo/${todo.id}"}>{todo.title}</Link>
            </li>
          ))}
        </ul>
        <Route path="/create" render={() => <CreateTodoForm addTodo={addTodo} />} />
        <Route path="/todo/:id" render={() => <TodoDetails todos={todos} setTodos={setTodos} />} />
      </div>
    </Router>
        </>
    )
}

export default TodosPage;

// return (
//     <h2>Todos Lista</h2>
//     <form onSubmit={handleAddTask} style={{marginBottom: '20px'}}>
//       <div>
//         <label>Titel: </label>
//         <input value={title} onChange={(e) => setTitle(e.target.value)} required/>
//       </div>
//       <div>
//         <label>Beskrivning: </label>
//         <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required/>
//       </div>
//       <div>
//         <label>Status (utförd): </label>
//         <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
//       </div>
//       <div>
//         <label>Tidsestimat (timmar): </label>
//         <input type="number" value={timeEstimate} onChange={(e) => setTimeEstimate(e.target.value)} required />
//       </div>
//       <div>
//         <label>Kategori: </label>
//         <select value={category} onChange={(e) => setCategory(e.target.value)} required>
//           <option value="Hälsa">Hälsa</option>
//           <option value="Hushåll">Hushåll</option>
//           <option value="Jobbrelaterat">Jobbrelaterat</option>
//           <option value="Nöje">Nöje</option>
//         </select>
//       </div>
//       <div>
//         <label>Deadline: </label>
//         <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required/>
//       </div>
//       <button type="submit">Lögg till ett ärende</button>
//     </form>

//     <h3>Ärenden</h3>
//     <ul>
//       {tasks.map((task, index) => (
//         <li>
//           <strong>Titel:</strong> {task.title}
//           <strong>Beskrivning:</strong> {task.description}
//           <strong>Status:</strong> {task.status ? "Utförd" : "Ej utförd"}
//           <strong>Tidsestimat:</strong> {task.timeEstimate}
//           <strong>Kategori:</strong> {task.category}
//           <strong>Deadline:</strong> {task.deadline}
//         </li>
//       ))}
//     </ul>
//   </div>
// )

// export default App