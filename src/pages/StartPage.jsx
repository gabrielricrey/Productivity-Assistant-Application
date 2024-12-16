import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";

const StartPage = () => {

    let [user,setUser] = useState(null);
    let upcomingEvents = JSON.parse(localStorage.getItem("events"))
        .filter(event => {
            if(user) {
                return event.userid === user.username && event.className == 'event-upcoming'
            }
        })
        .slice(0,3)

    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    return (
        <>
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
        </>
    )
}

export default StartPage;