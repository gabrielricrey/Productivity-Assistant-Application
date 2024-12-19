import './LoginPage.css'
import Welcome from "../../components/Welcome";
import Login from "../../components/Login";
import RegisterUser from "../../components/RegisterUser";

const LoginPage = () => {


    return (
        <div className="container">
            <Welcome/>
            <Login/>
            <RegisterUser/>
        </div>
    )
}

export default LoginPage;