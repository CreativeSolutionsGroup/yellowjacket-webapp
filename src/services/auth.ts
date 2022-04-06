import { Auth, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const loginUser = async (auth: Auth = getAuth(), provider = new GoogleAuthProvider()) => {
  return await signInWithPopup(auth, provider);
}

export const logoutUser = async (auth: Auth = getAuth()) => {
  return await auth.signOut();
}