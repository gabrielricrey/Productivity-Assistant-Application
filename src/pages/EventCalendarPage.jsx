import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const EventCalendarPage = () => {

    let [user, setUser] = useState(null); // Ta bort troligtvis
    let [events,setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);
    let activeUser = JSON.parse(sessionStorage.getItem("user")).username;

        
    let [eventTitle,setEventTitle] = useState("");
    let [eventStart, setEventStart] = useState("");
    let [eventEnd, setEventEnd] = useState("");

    let [editMode, setEditMode] = useState(false);
    let [editingEventId,setEditingEventId] = useState("");
    let [currentDateTime, setCurrentDateTime] = useState(new Date());

    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
        console.log('CHANGED!')
    }, [events])

    function createEvent(event) {

        let eventId = uuidv4();
        event.id = eventId;
        console.log(event);

        if(localStorage.getItem("events")) {
            setEvents([...JSON.parse(localStorage.getItem("events")),event]);
        } else {
            setEvents(event);
        }

        clearInputs()

        
    }

    function clearInputs() {
        setEventTitle("");
        setEventStart("");
        setEventEnd("");
    }

    function deleteEvent(id) {

        let filteredArray = events.filter(event => event.id !== id);

        setEvents(filteredArray);
    }

    function editEvent(id) {
        setEditMode(!editMode);
        setEditingEventId(id);

        let event = events.find(event => event.id === id);
        setEventTitle(event.eventTitle);
        setEventStart(event.eventStart);
        setEventEnd(event.eventEnd);
    }

    function saveChanges() {
        setEditMode(!editMode);
        let newArray = [...events];
        let index = newArray.findIndex(event => event.id === editingEventId);


        newArray[index].eventTitle = eventTitle;
        newArray[index].eventStart = eventStart;
        newArray[index].eventEnd = eventEnd;

        setEvents(newArray);
        clearInputs();
    }
    

    return (
        <div>
            <div>
                <h3>Create Event</h3>
                <input type="text" placeholder="Event" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
                <br />
                <input type="datetime-local" value={eventStart} onChange={(e) => setEventStart(e.target.value)}/>
                <br />
                <input type="datetime-local" value={eventEnd} min={eventStart} onChange={(e) => setEventEnd(e.target.value)}/>
                <br />
                <button onClick={() => {editMode? saveChanges() : createEvent({eventTitle,eventStart,eventEnd,userid: user.username})}}>{editMode ? "Save Changes" : "Create Event"}</button>
            </div>
            <div>
                <h3>Events</h3>
                <ul className="eventCardContainer">
                    {events && events.filter(event => event.userid === activeUser).map(event => <li className="eventCard"><h3>{event.eventTitle}</h3><p>Start: {event.eventStart}</p><p>Slut: {event.eventEnd}</p> <button onClick={() => editEvent(event.id)}>Edit</button><button onClick={() => deleteEvent(event.id)}> X </button></li> )}
                </ul>
            </div>
        </div>
    )
}

export default EventCalendarPage;