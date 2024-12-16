import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Events from "../../components/Events";
import './EventCalendarPage.css'

const EventCalendarPage = () => {

    let [user,setUser] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

   
    

    return (
        <div>
            {user && <Events username={user.username}/>}
        </div>
    )
}

export default EventCalendarPage;