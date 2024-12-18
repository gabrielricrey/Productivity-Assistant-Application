import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {

    let [user,setUser] = useState(null);
    let[quote, setQuote] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")) {
            setUser(JSON.parse(sessionStorage.getItem("user")));
        } else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
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
        <div className="kalle"></div>
        <div className="gabriel"></div>
        </>
    )
}

export default StartPage;