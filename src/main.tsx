import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { initFirebase } from './services/firebase'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import axios from 'axios'
import { Landing } from './Landing'

initFirebase();

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL ?? "https://us-central1-yellowjacket-check-in.cloudfunctions.net" // "http://localhost:5001/yellowjacket-check-in/us-central1" // 
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <TopBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
