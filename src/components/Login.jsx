import { useState } from "react";
import { useNavigate } from "react-router-dom";

let Login = () => {

    let [loginUsername, setLoginUsername] = useState("");
    let [loginPassword, setLoginPassword] = useState("");

    let navigate = useNavigate();

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

    return (
        <div className="login">
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
            <button onClick={login}>Sign in</button>
        </div>
    )
}

export default Login;