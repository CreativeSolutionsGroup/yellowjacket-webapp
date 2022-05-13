import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { SearchPage } from './views/SearchPage'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(u => {
      setIsLoggedIn(!!u);
    })
  }, []);

  return (
    <div>
      <div>
        {isLoggedIn ? (<SearchPage />) : <></>}
      </div>
    </div>
  )
}

export default App
