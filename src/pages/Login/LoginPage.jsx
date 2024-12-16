import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'

const LoginPage = () => {

    let [loginUsername, setLoginUsername] = useState("");
    let [loginPassword, setLoginPassword] = useState("");

    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [birthyear, setBirthyear] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

    let navigate = useNavigate()

    const login = () => {

        let users = JSON.parse(localStorage.getItem("users"));

        if (users) {
            let loggedInUser = users.find(user => loginUsername === user.username && loginPassword === user.password);
            console.log(loggedInUser);

            if (loggedInUser) {
                sessionStorage.setItem("user", JSON.stringify(loggedInUser));
                navigate('/start')
            } else {
                alert('Wrong username/password')
            }
        } else {
            alert('Wrong username/password')
        }

    }



    const register = (newUser) => {
        console.log(newUser);
        if (localStorage.getItem("users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users))
        } else {
            let users = [newUser];
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    return (
        <div className="container">
            <div className="welcome">
                <h1>Welcome</h1>
                <p style={{ fontStyle: "italic" }}> - To the Productivity Assistant App</p>
            </div>
            <div className="login">
                <h2>Login</h2>
                <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
                <button onClick={login}>Sign in</button>
            </div>
            <div className="register hide">
                <h2>Register here</h2>
                <input type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} required />
                <input type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} required />
                <input type="number" placeholder="Birthyear" onChange={(e) => setBirthyear(e.target.value)} required />
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <button onClick={() => register({ firstname, lastname, birthyear, username, password, email })}>Sign up</button>
            </div>

        </div>
    )
}

export default LoginPage;