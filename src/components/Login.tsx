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
      <button className="w-32 h-16 px-3 py-1 bg-cedarville-secondary rounded text-cedarville-primary font-extrabold" onClick={login}>Login</button>
    )
  } else {
    return (
      <button className="w-32 h-16 px-3 py-1 bg-cedarville-secondary rounded text-cedarville-primary font-extrabold" onClick={logout}>Logout</button>
    )
  }
  
}