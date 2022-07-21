import { getAuth } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react"
import { Login } from "./Login"

export const TopBar = ({ children }: PropsWithChildren<any>) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(u => {
      setIsLoggedIn(!!u);
    })
  }, []);

  return (
    <div className="bg-cedarville-primary flex flex-row items-center justify-between mb-10 h-32 shadow w-full px-5">
      <div>
        <h1 className="text-white font-bold text-xl sm:text-3xl">Yellow Jacket Check-In</h1>
      </div>
      <div className="w-32">
        <Login isLoggedIn={isLoggedIn} />
      </div>
    </div>
  )
}