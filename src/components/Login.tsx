import { loginUser, logoutUser } from "../services/auth"

export const Login = ({ isLoggedIn }: {isLoggedIn: boolean }) => {
  const login = async () => {
    await loginUser();
  }

  const logout = async () => {
    await logoutUser();
  }

  if (!isLoggedIn) {
    return (
      <button className="px-3 py-1 bg-orange-400 rounded text-white" onClick={login}>Login</button>
    )
  } else {
    return (
      <button className="px-3 py-1 bg-orange-400 rounded text-white" onClick={logout}>Logout</button>
    )
  }
  
}