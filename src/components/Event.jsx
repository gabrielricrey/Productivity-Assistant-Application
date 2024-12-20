let Event = ({ event, setEditingEventId, setEditCounter, deleteEvent }) => {

    function initializeEditEvent() {
        setEditingEventId(event.id)
        setEditCounter(x => x + 1)
    }

    return (

        <li className={`${event.className} eventCard`}>
            <div className="cardHeader">
                <h3>{event.eventTitle}</h3>
                {setEditCounter &&
                    <div className="eventcard-buttons">
                        <div className="buttons">
                            <button className="edit" onClick={() => initializeEditEvent()}>Edit</button>
                            <button className="close" onClick={() => deleteEvent(event.id)}> X </button>
                        </div>
                    </div >

                }
            </div>
            <p>Start: {event.eventStart}</p>
            <p>Slut: {event.eventEnd}</p>
        </li>

    )

}

export default Event;