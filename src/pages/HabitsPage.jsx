import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HabitsPage = () => {

    let [user,setUser] = useState(null);
    let [habits, setHabits] = useState([])
    let [title, setTitle] = useState("")
    let [repetition, setRepetition] = useState("")
    let [priority, setPriority] = useState("")
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    const addHabit = () => {
        let newHabit = {
            title: title,
            repetition: parseInt(repetition),
            priority: priority
        }
        setHabits([...habits, newHabit])
    }

    return(<>
        <div className="addHabit">
            <h3>Add a habit</h3>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required/>
        <br />
        <input type="number" placeholder="Repetitions" onChange={(e) => setRepetition(e.target.value)} required/>
        <br />
        <select onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <br />
        <button onClick={addHabit}>Add habit</button>
        </div>

        <div className="habitDisplay">
            <ul>
                {habits.map((habit, i) => <li key={i} className="habitItem">
                    <p><strong>Title: </strong>{habit.title}</p>
                    <p><strong>Repetitions: </strong>{habit.repetition}</p>
                    <p><strong>Priority: </strong>{habit.priority}</p>
                </li>)}
            </ul>
        </div>
        </>)
}

export default HabitsPage;