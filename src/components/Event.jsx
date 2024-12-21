import { useContext } from "react"
import { EditModeContext } from "../context/EditModeContext";

let Event = ({ event, deleteEvent }) => {

    function initializeEditEvent() {
        setEditingEventId(event.id);
        setEditMode(!editMode);
        setEditCounter(x => x + 1)
    }

    const { editMode, setEditMode, setEditingEventId, setEditCounter } = useContext(EditModeContext);

    return (

        <li className={`${event.className} eventCard`}>
            <div className="cardHeader">
                <h3>{event.eventTitle}</h3>
                {deleteEvent &&
                    <div className="eventcard-buttons">
                        <div className="buttons">
                            <button className="edit" onClick={() => initializeEditEvent()}>Edit</button>
                            <button className="close" onClick={() => { if (!editMode) { deleteEvent(event.id) } else { alert("Can't delete while editing") } }}> X </button>
                        </div>
                    </div >

                }
            </div>
            <div>
                <p>{event.eventStart}</p>
                <p>{event.eventEnd}</p>
            </div>
        </li>

    )

}

export default Event;