import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";

const StartPage = () => {

    let navigate = useNavigate();
    let user = JSON.parse(sessionStorage.getItem("user"));
    let [upcomingEvents,setUpcomingEvents] = useState(localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events"))
    .filter(event => event.userid === user.username && event.className == 'event-upcoming')
    .slice(0,3) : [])


    useEffect(() => {
        if(!sessionStorage.getItem("user")) {
            navigate('/')
        } 
    }, [])

    return (
        <div>
            <h2>StartPage</h2>
            <div className="william"></div>
            <div className="kalle"></div>
            <div className="gabriel">
                <h3>Upcoming Events: </h3>
                <ul>
                    {upcomingEvents && upcomingEvents
                        .map((event, i) =>
                            <Event event={event} key={i} />)}
                </ul>
            </div>
        </div>
    )
}

export default StartPage;