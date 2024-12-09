import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    let [username,setUsername] = useState("");
    let [password,setPassword] = useState("");

    let [regFirstname,setRegFirstname] = useState("");
    let [regLastname,setRegLastname] = useState("");
    let [regBirthyear,setRegBirthyear] = useState("");
    let [regUsername,setRegUsername] = useState("");
    let [regPassword,setRegPassword] = useState("");
    let [regEmail,setRegEmail] = useState("");

    let navigate = useNavigate()

    const login = () => {

        let users = JSON.parse(localStorage.getItem("users"));
        let loggedInUser = users.find((user) => username === user.username && password === user.password);

        if(loggedInUser) {
            sessionStorage.setItem("user",JSON.stringify(loggedInUser));
            navigate('/start')
        }
        
    }

    

    const register = (newUser) => {
        if(localStorage.getItem("users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users))
            navigate('/')
        } else {
            let users = [newUser];
            localStorage.setItem("users", JSON.stringify(users));
            navigate('/')
        }
    }

    return (
        <div>
            <h3>Login</h3>
            <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <button onClick={login}>Sign in</button>
            <br />
            <h3>Register here</h3>
            <input type="text" placeholder="Firstname" onChange={(e) => setRegFirstname(e.target.value)} required/>
            <input type="text" placeholder="Lastname" onChange={(e) => setRegLastname(e.target.value)} required/>
            <input type="number" placeholder="Birthyear" onChange={(e) => setRegBirthyear(e.target.value)} required/>
            <input type="text" placeholder="Username" onChange={(e) => setRegUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" onChange={(e) => setRegPassword(e.target.value)} required/>
            <input type="text" placeholder="Email" onChange={(e) => setRegEmail(e.target.value)} required/>
            <br />
            <button onClick={register}>Sign up</button>

        </div>
    )
}

export default LoginPage;