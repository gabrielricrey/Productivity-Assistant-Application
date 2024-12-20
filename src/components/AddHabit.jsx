const AddHabit = ({addHabit, title, setTitle, repetition, setRepetition, priority, setPriority}) => {
    return(
        <>
        <div className="addHabit">
            <h3>Add a habit</h3>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            
            <input type="number" placeholder="Repetitions" value={repetition} onChange={(e) => setRepetition(e.target.value)} required/>

            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="addForm">
                <option value="Default" disabled>Select a priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button onClick={addHabit}>Add habit</button>
        </div>
        </>
    )
}

export default AddHabit;