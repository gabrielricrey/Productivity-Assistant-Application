const FilterHabit = ({filteredPriority, setFilteredPriority}) => {
    return(
        <>
            <p>Filter by priority</p>
            <select value={filteredPriority} onChange={(e) => setFilteredPriority(e.target.value)}>
                <option value="Default">Show all</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </>
    )
}

export default FilterHabit;