import { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import {EditModeContext}  from "../context/EditModeContext";

let CreateAndEditEvent = ({ saveChanges, updateEvents, setEvents}) => {

    let activeUser = JSON.parse(sessionStorage.getItem("user")).username;

    let [eventTitle, setEventTitle] = useState("");
    let [eventStart, setEventStart] = useState("");
    let [eventEnd, setEventEnd] = useState("");

    const { editMode, setEditMode, editingEventId, editCounter } = useContext(EditModeContext);
    
    
    useEffect(() => {
        if(editingEventId) {
            editEvent();
        }
    }, [editCounter])

    function editEvent() {
        setEditMode(!editMode);

        let event = JSON.parse(localStorage.getItem("events")).find(event => event.id === editingEventId);
        setEventTitle(event.eventTitle);
        setEventStart(event.eventStart);
        setEventEnd(event.eventEnd);

        if(editMode) {
            clearInputs();
        }
    }

    function saveChanges() {
        setEditMode(!editMode);
        let newArray = [...JSON.parse(localStorage.getItem("events"))];
        let index = newArray.findIndex(event => event.id === editingEventId);

        newArray[index].eventTitle = eventTitle;
        newArray[index].eventStart = eventStart;
        newArray[index].eventEnd = eventEnd;

        setEvents(newArray);
        clearInputs();
    }


    function createEvent(event) {

        if(event.eventTitle != "" && event.eventStart != "" && event.eventEnd != "") {
            let eventId = uuidv4();
            event.id = eventId;
            event.userid = activeUser;
            console.log(event);
    
            updateEvents(event)
            clearInputs();
        } else {
            alert('Enter all fields');
        }
    }

    function clearInputs() {

        setEventTitle("");
        setEventStart("");
        setEventEnd("");

    }
    return (
        <div className={editMode ? "green create-event" : "create-event"}>
            <h3>Create Event</h3>
            <input type="text" placeholder="Event" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
            <input type="datetime-local" value={eventStart} onChange={(e) => setEventStart(e.target.value)} />
            <input type="datetime-local" value={eventEnd} min={eventStart} onChange={(e) => setEventEnd(e.target.value)} />
            <button onClick={() => { editMode ? saveChanges() : createEvent({ eventTitle, eventStart, eventEnd }) }}>{editMode ? "Save Changes" : "Create Event"}</button>
        </div>

    )
}

export default CreateAndEditEvent;