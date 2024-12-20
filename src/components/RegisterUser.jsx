import { useState } from "react";

let RegisterUser = ({toggleVisibility, SetToggleVisibility}) => {

    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [birthyear, setBirthyear] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

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

        SetToggleVisibility(!toggleVisibility);
    }

    return (
        <div className="register">
                <h2>Register here</h2>
                <input type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} required />
                <input type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} required />
                <input type="number" placeholder="Birthyear" onChange={(e) => setBirthyear(e.target.value)} required />
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <button onClick={() => register({ firstname, lastname, birthyear, username, password, email })}>Sign up</button>
            </div>
    )
}

export default RegisterUser;