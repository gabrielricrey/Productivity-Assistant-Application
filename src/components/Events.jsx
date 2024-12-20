import { useEffect, useState, useContext } from "react";
import Event from './Event.jsx'
import Filter from "./Filter.jsx";
import CreateAndEditEvent from "./CreateAndEditEvent.jsx";
import { EventsContext } from "../context/EventsContext.jsx";

let Events = ({ username }) => {

    let activeUser = username;

    const { events, setEvents, currentDateTime, setCurrentDateTime } = useContext(EventsContext);

    let [filter, setFilter] = useState("");


    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events])

    
    function updateEvents(event) {

        if (localStorage.getItem("events")) {

            let currentEvents = JSON.parse(localStorage.getItem("events"));
            let updatedEvents = [...currentEvents, event];
            setEvents(updatedEvents);

        } else {
            setEvents(event);
        }
    }

    function deleteEvent(id) {

        let filteredArray = events.filter(event => event.id !== id);

        setEvents(filteredArray);
    }


    return (
        <div className="events-container">
                <CreateAndEditEvent updateEvents={updateEvents} setEvents={setEvents} />
            <div className="events">
                <div className="header">
                <h3>Events</h3>
                <Filter filter={filter} setFilter={setFilter} />
                </div>
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
                        .filter(event => event.userid === activeUser)
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
                                <Event event={event} deleteEvent={deleteEvent} key={i} />
                            )

                        })}
                </ul>
            </div>
        </div>
    )
}

export default Events;