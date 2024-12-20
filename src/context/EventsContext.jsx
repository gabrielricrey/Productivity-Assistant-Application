import { createContext, useState, useEffect } from 'react';

export const EventsContext = createContext();

export const EventsContextProvider = ({ children }) => {
    
    let [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);
    let [currentDateTime, setCurrentDateTime] = useState(new Date());
    
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentDateTime(new Date());
            }, 60000);
    
            return () => clearInterval(interval);
        }, [])

    return(
        <EventsContext.Provider value={{events, setEvents, currentDateTime, setCurrentDateTime}}>
            {children}
        </EventsContext.Provider>
    );
}