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
      <button onClick={login}>Login</button>
    )
  } else {
    return (
      <button onClick={logout}>Logout</button>
    )
  }
  
}