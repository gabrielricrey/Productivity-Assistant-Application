import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";

const StartPage = () => {


    let[quote, setQuote] = useState(null);
    let navigate = useNavigate();
    let user = JSON.parse(sessionStorage.getItem("user"));
    let [upcomingEvents,setUpcomingEvents] = useState(localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events"))
    .filter(event => event.userid === user.username && event.className == 'event-upcoming')
    .slice(0,3) : [])



    useEffect(() => {
        if(!sessionStorage.getItem("user")) {
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

   

    return(
        <>
        <h2>StartPage</h2>
        {user && <p>{`Hello ${user.username}`}</p>}
        { quote && <p>{quote}</p>}
        <div className="william"></div>
        <div className="kalle">
            <h3>Test</h3>
            <ul>
                {JSON.parse(localStorage.getItem("todos"))
                .filter(todo => todo.userid === JSON.parse(sessionStorage.getItem("user")).username)
                .reverse()
                .slice(0,3)
                .map(todo => <li>{todo.title}</li>)
                
                }
            </ul>
        </div>
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