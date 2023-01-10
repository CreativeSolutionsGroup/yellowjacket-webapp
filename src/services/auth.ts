import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Logins a user into firebase
 * @param auth The auth service
 * @param provider Defaults to google auth provider 
 * @returns The signin user object.
 */
export const loginUser = async (provider = new GoogleAuthProvider()) => {
  return await signInWithPopup(auth, provider);
}

/**
 * Logs out a user using Firebase.
 * @param auth The auth service
 * @returns the logged out user object from Firebase
 */
export const logoutUser = async () => {
  return await auth.signOut();
}