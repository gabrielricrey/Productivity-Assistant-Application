import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {EditModeContextProvider} from './context/EditModeContext'
import { EventsContextProvider } from './context/EventsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <EditModeContextProvider>
        <EventsContextProvider>
          <App />
        </EventsContextProvider>
      </EditModeContextProvider>
    </Router>
  </StrictMode>,
)
