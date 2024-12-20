import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Event from "../components/Event";
import Habit from "../components/Habit";
import { EventsContext } from "../context/EventsContext";
import './StartPage.css';


const StartPage = () => {

    let [quote, setQuote] = useState(null);
    let navigate = useNavigate();
    let activeUser = JSON.parse(sessionStorage.getItem("user"));

    const { events, currentDateTime } = useContext(EventsContext);


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

    
    return(
        <div className="startpage-container">
            <div className="welcome">
                {activeUser && <h2>{`Hello ${activeUser.username}!`}</h2>}
                {quote && <p>{quote}</p>}
            </div>
            <div className="william">
            <h3>Most frequent habits:</h3>
            <ul>
            {JSON.parse(localStorage.getItem("habits"))
            .filter( habit => habit.userid === JSON.parse(sessionStorage.getItem("user")).username)
            .sort((a, b) => b.repetition - a.repetition)
            .slice( 0, 3)
            .map((habit, i) => <Habit habit={habit}index={i}/>)}
            </ul>
        </div>
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
        <h3>Upcoming Events: </h3><button onClick={() => navigate('/events')}>To all events</button>
                <ul>
                    {events && events
                    .map(event => {

                        let eventStart = new Date(event.eventStart);
                        let eventEnd = new Date(event.eventEnd);

                        if (eventEnd < currentDateTime) {
                            event.className = 'event-finished';
                        } else if (eventStart < currentDateTime && currentDateTime < eventEnd) {
                            event.className = 'event-ongoing'
                        } else {
                            event.className = 'event-upcoming';
                        }

                        return event;
                    })
                    .filter(event => event.userid === activeUser?.username && event.className == 'event-upcoming' || event.className == 'event-ongoing')
                    .slice(0, 3)
                    .map((event, i) => <Event event={event} key={i} />)}
                </ul>
            </div>

        </div>
    )
}

export default StartPage;

