import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Habits.css"
import Habits from "../../components/Habits";


const HabitsPage = () => {



    return(<div className="habits">

        <Habits/>   

        </div>)
}

export default HabitsPage;