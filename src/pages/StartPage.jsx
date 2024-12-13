import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {

    let [user,setUser] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    return(
        <>
        <h2>StartPage</h2>
        <div className="william"></div>
        <div className="kalle"></div>
        <div className="gabriel"></div>
        </>
    )
}

export default StartPage;