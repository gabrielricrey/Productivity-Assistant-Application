import Habit from "./Habit";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddHabit from "./AddHabit.jsx";
import FilterHabit from "./FilterHabit.jsx";
import SortHabit from "./SortHabit.jsx";
import { v4 as uuidv4 } from 'uuid';


const Habits = () => {
    let [habits, setHabits] = useState(JSON.parse(localStorage.getItem("habits")) || []);
    let [filteredHabits, setFilteredHabits] = useState([]);
    let [title, setTitle] = useState("");
    let [repetition, setRepetition] = useState("");
    let [priority, setPriority] = useState("Default");
    let [filteredPriority, setFilteredPriority] = useState("Default");
    let [sortList, setSortList] = useState("")
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            JSON.parse(sessionStorage.getItem("user"));
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

    useEffect(() => {
        sortArray()
    }, [sortList])

    const addHabit = () => {
        if(title === "" || repetition === "" || priority === "Default") {
            return alert("All inputs are required")
        } else {
            let newHabit = {
                title: title,
                repetition: parseInt(repetition),
                priority: priority,
                userid: JSON.parse(sessionStorage.getItem("user")).username,
                id: uuidv4()
            }
            setHabits([...habits, newHabit])

            setTitle("")
            setRepetition("")
            setPriority("Default")
            setFilteredPriority("Default")
        }

    }

    const removeHabit = (id) => {
        let newArray = habits.filter(habit => habit.id !== id)
        setHabits(newArray);
    }

    const incrementRep = (id) => {
        let updatedHabits = habits.map(habit =>
            habit.id === id ? { ...habit, repetition: habit.repetition + 1} : habit
        );
        setHabits(updatedHabits);
        console.log(habits);

    }

    const decreaseRep = (id) => {
        let updatedHabits = habits.map(habit =>
            habit.id === id ? { ...habit, repetition: habit.repetition - 1} : habit
        );
        setHabits(updatedHabits);
        console.log(habits);
    }

    const resetRep = (id) => {
        let updatedHabits = habits.map(habit =>
            habit.id === id ? { ...habit, repetition: habit.repetition = 0} : habit
        );
        setHabits(updatedHabits);
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

    const sortArray = () => {
        let sortedHabits = [...habits]

        let valueMapping = {
            High: 3,
            Medium: 2,
            Low: 1
        }
        if(sortList === "Unsorted") {
          sortedHabits = JSON.parse(localStorage.getItem("habits")) || [];
        } else if(sortList === "High") {
            sortedHabits.sort((a, b) => valueMapping[b.priority] - valueMapping[a.priority])
        } else if(sortList === "Low") {
            sortedHabits.sort((a, b) => valueMapping[a.priority] - valueMapping[b.priority])
        } else if(sortList === "Rep descend") {
            sortedHabits.sort((a, b) => b.repetition - a.repetition)
        } else {
            sortedHabits.sort((a, b) => a.repetition - b.repetition)
        }
        setFilteredHabits(sortedHabits);
    }
    return(
        <>
        
         <AddHabit addHabit={addHabit} title={title} setTitle={setTitle} repetition={repetition} setRepetition={setRepetition} priority={priority} setPriority={setPriority}/>
        <div className="habitDisplay">
        <FilterHabit filteredPriority={filteredPriority} setFilteredPriority={setFilteredPriority}/>
        <SortHabit sortList={sortList} setSortList={setSortList}/>
            <ul>
                {filteredHabits.filter(habit => habit.userid === JSON.parse(sessionStorage.getItem("user")).username).map((habit, i) => <Habit habit={habit} removeHabit={removeHabit} incrementRep={incrementRep} decreaseRep={decreaseRep} resetRep={resetRep} index={i} key={i}/>)}
            </ul>
        </div>
        </>
    )
}

export default Habits;