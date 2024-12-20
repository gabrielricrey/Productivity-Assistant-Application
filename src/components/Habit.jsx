const Habit = ({habit, index, removeHabit, incrementRep, decreaseRep, resetRep}) => {
    return(
        <>
        <li className="habitItem">
            <p><strong>Title: </strong>{habit.title}</p>
            <p><strong>Repetitions: </strong>{habit.repetition}</p>
            <p><strong>Priority: </strong>{habit.priority}</p>
            <button onClick={() => removeHabit(habit.id)}>Remove habit</button>
            <button onClick={() => incrementRep(habit.id)}>Increase repetition</button>
            <button onClick={() => decreaseRep(habit.id)}>Decrease repetition</button>
            <button onClick={() => resetRep(habit.id)}>Reset repetition</button>
        </li>
        </>
    )
}

export default Habit;