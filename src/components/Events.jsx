import { useEffect, useState } from "react";
import Event from './Event.jsx'
import Filter from "./Filter.jsx";
import CreateAndEditEvent from "./CreateAndEditEvent.jsx";

let Events = ({username}) => {

    let activeUser = username;

    let [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")).filter(event => event.userid === activeUser) || []);
    let [filter, setFilter] = useState("");
    let [currentDateTime, setCurrentDateTime] = useState(new Date());
    let [editingEventId, setEditingEventId] = useState("");
    let [editCounter, setEditCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, [] )

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events])


    function updateEvents(event) {

        if (localStorage.getItem("events")) {

            let currentEvents = JSON.parse(localStorage.getItem("events"));
            let updatedEvents = [...currentEvents,event];
            setEvents(updatedEvents);

        } else {
            setEvents(event);
        }
    }

    function deleteEvent(id) {

        let filteredArray = events.filter(event => event.id !== id);

        setEvents(filteredArray);
    }


    return(
        <div>
                <h3>Events</h3>
                <CreateAndEditEvent editingEventId={editingEventId} editCounter={editCounter} updateEvents={updateEvents} setEvents={setEvents} />
                <Filter filter={filter} setFilter={setFilter}/>
                <ul className="eventCardContainer">
                    {events && events
                        .sort((a, b) => {
                            const dateAStart = new Date(a.eventStart);
                            const dateBStart = new Date(b.eventStart);

                            if (dateAStart - dateBStart !== 0) {
                                return dateAStart - dateBStart;
                            }

                            const dateBEnd = new Date(b.eventEnd);
                            const dateAEnd = new Date(a.eventEnd);

                            return dateAEnd - dateBEnd;
                        })
                        .filter(event => {
                            let eventStart = new Date(event.eventStart);
                            let eventEnd = new Date(event.eventEnd);

                            switch (filter) {
                                case "":
                                    return true
                                case "upcoming":
                                    return eventStart > currentDateTime
                                case "ongoing":
                                    return eventStart < currentDateTime && eventEnd > currentDateTime
                                case "finished":
                                    return eventEnd < currentDateTime
                            }
                        })
                        .map((event, i) => {

                            let eventStart = new Date(event.eventStart);
                            let eventEnd = new Date(event.eventEnd);

                            if (eventEnd < currentDateTime) {
                                event.className = 'event-finished';
                            } else if (eventStart < currentDateTime && currentDateTime < eventEnd) {
                                event.className = 'event-ongoing'
                            } else {
                                event.className = 'event-upcoming';
                            }

                            return (
                                <Event event={event} deleteEvent={deleteEvent} setEditingEventId={setEditingEventId} setEditCounter={setEditCounter} key={i}/>
                            )

                        })}
                </ul>
            </div>
    )
}

export default Events;