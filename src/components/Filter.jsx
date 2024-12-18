let Filter = ({filter, setFilter}) => {

    return (
        <div className="filter">            
            <input type="radio" name="filter" id="all" value="" onChange={(e) => setFilter(e.target.value)} checked={filter === ''}/>
            <label htmlFor="all">All</label>
            <input type="radio" name="filter" id="upcoming" value="upcoming" onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="all">Upcoming</label>
            <input type="radio" name="filter" id="ongoing" value="ongoing" onChange={(e) => setFilter(e.target.value)}/>
            <label htmlFor="all">Ongoing</label>
            <input type="radio" name="filter" id="finished" value="finished" onChange={(e) => setFilter(e.target.value)}/>
            <label htmlFor="all">Finished</label>
        </div>
    )
}

export default Filter;