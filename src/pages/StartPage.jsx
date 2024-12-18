import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";
import './StartPage.css';

const StartPage = () => {


    let [quote, setQuote] = useState(null);
    let navigate = useNavigate();
    let user = JSON.parse(sessionStorage.getItem("user"));
    let upcomingEvents = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events"))
        .filter(event => event.userid === user.username && event.className == 'event-upcoming')
        .slice(0, 3) : []
    // let [upcomingEvents,setUpcomingEvents] = useState(localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events"))
    // .filter(event => event.userid === user.username && event.className == 'event-upcoming')
    // .slice(0,3) : [])


    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            navigate('/')
        }
        showQuote()
    }, [])

    const showQuote = async () => {
        let response = await fetch("https://api.quotable.io/quotes/random")
        let data = await response.json();
        console.log(data[0].content);
        setQuote(data[0].content)
    }



    return (
        <div className="startpage-container">
            <div className="welcome">
                {user && <h2>{`Hello ${user.username}!`}</h2>}
                {quote && <p>{quote}</p>}
            </div>
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