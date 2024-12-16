let Event = ({ event, setEditingEventId, setEditCounter, deleteEvent }) => {

    function initializeEditEvent() {
        setEditingEventId(event.id)
        setEditCounter(x => x + 1)
    }

    return (

        <li className={`${event.className} eventCard`}>
            <h3>{event.eventTitle}</h3>
            <p>Start: {event.eventStart}</p>
            <p>Slut: {event.eventEnd}</p>
            {setEditCounter &&
                <>
                    <button onClick={() => initializeEditEvent()}>Edit</button>
                    <button onClick={() => deleteEvent(event.id)}> X </button>
                </>

            }
        </li>

    )

}

export default Event;