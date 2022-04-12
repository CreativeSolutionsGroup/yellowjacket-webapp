import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Login } from './components/Login'
import { SearchPage } from './views/SearchPage'
import { getGoogleSheetJSON } from './services/students'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(u => {
      setIsLoggedIn(!!u);
    })
  }, []);

  return (
    <div>
      {isLoggedIn ? (<SearchPage />) : <></>}
    </div>

  )

}

export default App
