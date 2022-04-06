import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { initFirebase } from './services/firebase'
import App from './App'

initFirebase();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
