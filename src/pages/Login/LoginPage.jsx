import './LoginPage.css'
import Welcome from "../../components/Welcome";
import Login from "../../components/Login";
import RegisterUser from "../../components/RegisterUser";
import { useState } from 'react';

const LoginPage = () => {

    let [toggleVisibility,SetToggleVisibility] = useState(true);


    return (
        <div className="container">
            <Welcome/>
            {toggleVisibility && <Login SetToggleVisibility={SetToggleVisibility} toggleVisibility={toggleVisibility}/>}
            {!toggleVisibility && <RegisterUser SetToggleVisibility={SetToggleVisibility} toggleVisibility={toggleVisibility} />}
        </div>
    )
}

export default LoginPage;