import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HabitsPage = () => {

    let [user,setUser] = useState(null);
    let [habits, setHabits] = useState(JSON.parse(localStorage.getItem("habits")) || []);
    let [filteredHabits, setFilteredHabits] = useState([]);
    let [title, setTitle] = useState("");
    let [repetition, setRepetition] = useState("");
    let [priority, setPriority] = useState("");
    let [filteredPriority, setFilteredPriority] = useState("");
    let [sortList, setSortList] = useState("")
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits))
    }, [habits])

    useEffect(() => {
        filterByPriority()
    }, [filteredPriority, habits])

    const addHabit = () => {
        if(title === "" || repetition === "" || priority === "Default") {
            return alert("All inputs are required")
        } else {
            let newHabit = {
                title: title,
                repetition: parseInt(repetition),
                priority: priority,
                userid: user.username
            }
            setHabits([...habits, newHabit])

            setTitle("")
            setRepetition("")
            setPriority("Default")
            setFilteredPriority("Default")
        }

    }

    const removeHabit = (i) => {
        let newArray = [...habits]
        newArray.splice(i,1)
        setHabits(newArray)
    }

    const incrementRep = (i) => {

        let newArray = [...habits];
        newArray[i].repetition ++;
        setHabits(newArray);
        console.log(habits);

    }

    const decreaseRep = (i) => {
        let newArray = [...habits];
        newArray[i].repetition --;
        setHabits(newArray)
        console.log(habits);
    }

    const resetRep = (i) => {
        let newArray = [...habits];
        newArray[i].repetition = 0;
        setHabits(newArray)
        console.log(habits);
    }

    const filterByPriority = () => {

        if(filteredPriority === "Default") {
            setFilteredHabits(habits)
        } else {
            let priorityFilter = habits.filter(habit => habit.priority === filteredPriority)

            setFilteredHabits(priorityFilter)
        }


    }

    const sortArray = () => {}

    return(<>
        <div className="addHabit">
            <h3>Add a habit</h3>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <br />
        <input type="number" placeholder="Repetitions" value={repetition} onChange={(e) => setRepetition(e.target.value)} required/>
        <br />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Default" disabled>Select a priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <br />
        <button onClick={addHabit}>Add habit</button>
        </div>

        <div className="habitDisplay">
            <p>Filter by priority</p>
            <select value={filteredPriority} onChange={(e) => setFilteredPriority(e.target.value)}>
                <option value="Default">Show all</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <p>Sort list:</p>
            <select value={sortList} onChange={sortArray}>
                <option value="Default" disabled>Sort by</option>
                <option value="Low ascend">Low priority</option>
                <option value="Low descend">Low priority - descending</option>
                <option value="Medium ascend">Medium priority</option>
                <option value="Medium decscend">Medium priority - descending</option>
                <option value="High ascend">High priority</option>
                <option value="High descend">High priority - descending</option>
                <option value="Rep ascend">Repetition</option>
                <option value="Rep descend">Repetition - descending</option>
            </select>
            <ul>
                {filteredHabits.map((habit, i) => <li key={i} className="habitItem">
                    <p><strong>Title: </strong>{habit.title}</p>
                    <p><strong>Repetitions: </strong>{habit.repetition}</p>
                    <p><strong>Priority: </strong>{habit.priority}</p>
                    <button onClick={() => removeHabit(i)}>Remove habit</button>
                    <button onClick={() => incrementRep(i)}>Increase repetition</button>
                    <button onClick={() => decreaseRep(i)}>Decrease repetition</button>
                    <button onClick={() => resetRep(i)}>Reset repetition</button>
                </li>)}
            </ul>
        </div>
        </>)
}

export default HabitsPage;