import { useState } from 'react'
import { Routes, Route, Link, useNavigate} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login/LoginPage.jsx'
import StartPage from './pages/StartPage'
import HabitsPage from './pages/habits/HabitsPage'
import TodosPage from './pages/TodosPage'
import EventCalendarPage from './pages/EventCalendar/EventCalendarPage.jsx'

function App() {

  let navigate = useNavigate();

  function signOut() {
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <>
    {sessionStorage.getItem("user") && <nav>
      <ul>
        <li><Link to='/start'>Start</Link></li>
        <li><Link to='/habits'>Habits</Link></li>
        <li><Link to='/todos'>Todos</Link></li>
        <li><Link to='/events'>Events</Link></li>
      </ul>
      <button className='signout' onClick={() => signOut()}>Sign Out</button>
    </nav>}
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/start' element={<StartPage/>}/>
        <Route path='/habits' element={<HabitsPage/>}/>
        <Route path='/todos' element={<TodosPage/>}/>
        <Route path='/events' element={<EventCalendarPage/>}/>
        <Route path="/todos/:todoId" element={<TodosPage />} />
      </Routes>
    </>
  )
}

export default App
