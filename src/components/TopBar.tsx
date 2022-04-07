import { getAuth } from "@firebase/auth";
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
    <div className="bg-blue-500 flex flex-row items-center mb-10 h-16 shadow w-full px-5">
      <div className="ml-auto">

      <Login isLoggedIn={isLoggedIn} />
      </div>
    </div>
  )
}