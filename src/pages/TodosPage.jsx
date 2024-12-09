import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodosPage = () => {

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
        </>
    )
}

export default TodosPage;