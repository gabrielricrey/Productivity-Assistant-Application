import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventCalendarPage = () => {

    let [user, setUser] = useState(null);
    let [events,setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);

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
    }, [events])

    function createEvent(event) {

        if(localStorage.getItem("events")) {
            setEvents([...JSON.parse(localStorage.getItem("events")),event]);
        } else {
            setEvents(event);
        }
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
                    {user && events.filter(event => event.userid === user.username).map(event => <li>{event.eventTitle} + {event.eventStart} + {event.userid}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default EventCalendarPage;