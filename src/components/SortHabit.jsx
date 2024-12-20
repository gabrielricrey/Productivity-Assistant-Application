const SortHabit = ({sortList, setSortList}) => {
    return(
        <>
            <p>Sort list:</p>
            <select value={sortList} onChange={(e) => setSortList(e.target.value)}>
                <option value="Default" disabled>Sort by</option>
                <option value="Unsorted">Unsorted</option>
                <option value="Low">Low priority</option>
                <option value="High">High priority</option>
                <option value="Rep descend">Repetition - descending</option>
                <option value="Rep ascend">Repetition</option>
            </select>
        </>
    )
}

export default SortHabit;