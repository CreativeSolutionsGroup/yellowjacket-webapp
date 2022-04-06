import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import './App.css'
import { Login } from './components/Login'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(u => {
      setIsLoggedIn(!!u);
    })
  }, [])

  return (
    <Login isLoggedIn={isLoggedIn} />
  )

}

export default App
