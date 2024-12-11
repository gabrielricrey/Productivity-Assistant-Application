import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventCalendarPage = () => {

    let [user, setUser] = useState(null); // Ta bort troligtvis
    let [events,setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);
    let activeUser = JSON.parse(sessionStorage.getItem("user")).username;

        
    let [eventTitle,setEventTitle] = useState("");
    let [eventStart, setEventStart] = useState("");
    let [eventEnd, setEventEnd] = useState("");

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

        if(localStorage.getItem("events")) {
            setEvents([...JSON.parse(localStorage.getItem("events")),event]);
        } else {
            setEvents(event);
        }
    }

    function deleteEvent(i) {
        let newArray = [...events]

        newArray.splice(i,1);

        setEvents(newArray);
    }
    

    return (
        <div>
            <div>
                <h3>Create Event</h3>
                <input type="text" placeholder="Event"onChange={(e) => setEventTitle(e.target.value)}/>
                <br />
                <input type="datetime-local" onChange={(e) => setEventStart(e.target.value)}/>
                <br />
                <input type="datetime-local" min={eventStart} onChange={(e) => setEventEnd(e.target.value)}/>
                <br />
                <button onClick={() => createEvent({eventTitle,eventStart,eventEnd,userid: user.username})}>Create event</button>
            </div>
            <div>
                <h3>Events</h3>
                <ul>
                    {events && events.map((event,i) => ({event,i})).filter(event => event.event.userid === activeUser).map(event =>  <li>{event.event.eventTitle} <button onClick={() => deleteEvent(event.event.i)}> X </button></li> )}
                </ul>
            </div>
        </div>
    )
}

export default EventCalendarPage;