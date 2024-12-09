import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCalendarPage = () => {

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    let [user, setUser] = useState(null);
    let [events,setEvents] = useState(JSON.parse(localStorage.getItem("events")) || [])

    let [eventTitle,setEventTitle] = useState("");
    let [eventStart, setEventStart] = useState("");
    let [eventEnd, setEventEnd] = useState("");

    let navigate = useNavigate();

    function createEvent(event) {
        if(events) {
            let newArray = [...events,event];
            setEvents(newArray);
            localStorage.setItem("events", JSON.stringify(newArray));
        } else {
            setEvents(event)
            localStorage.setItem("events", JSON.stringify(newArray));
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
                <input type="datetime-local" onChange={(e) => setEventEnd(e.target.value)}/>
                <br />
                <button onClick={() => createEvent({eventTitle,eventStart,eventEnd,userid: user.username})}>Create event</button>
            </div>
            <div>
                <h3>Events</h3>
            </div>
        </div>
    )
}

export default EventCalendarPage;