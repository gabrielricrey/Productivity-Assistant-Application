import { useState } from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import StartPage from './pages/StartPage'
import HabitsPage from './pages/HabitsPage'
import TodosPage from './pages/TodosPage'
import EventCalendarPage from './pages/EventCalendarPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/start' element={<StartPage/>}/>
        <Route path='/habits' element={<HabitsPage/>}/>
        <Route path='/todos' element={<TodosPage/>}/>
        <Route path='/events' element={<EventCalendarPage/>}/>
      </Routes>
    </>
  )
}

export default App
