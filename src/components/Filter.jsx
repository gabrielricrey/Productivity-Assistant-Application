let Filter = ({filter, setFilter}) => {

    return (
        <>
            <label htmlFor="filter">Filter: </label>
            <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">--</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
            </select>
            <button onClick={() => setFilter("")}>Restore</button>
        </>
    )
}

export default Filter;