import { Auth, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 * Logins a user into firebase
 * @param auth The auth service
 * @param provider Defaults to google auth provider 
 * @returns The signin user object.
 */
export const loginUser = async (auth: Auth = getAuth(), provider = new GoogleAuthProvider()) => {
  return await signInWithPopup(auth, provider);
}

/**
 * Logs out a user using Firebase.
 * @param auth The auth service
 * @returns the logged out user object from Firebase
 */
export const logoutUser = async (auth: Auth = getAuth()) => {
  return await auth.signOut();
}