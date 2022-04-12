// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/**
 * Initializes the Firebase app.
 * @returns The app and analytics object.
 */
export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAiG-G37a0PxlYRmXPPf1Bede-MCMXSkS8",
    authDomain: "yellowjacket-check-in.firebaseapp.com",
    projectId: "yellowjacket-check-in",
    storageBucket: "yellowjacket-check-in.appspot.com",
    messagingSenderId: "126412990786",
    appId: "1:126412990786:web:278135a40ebb485868c0db",
    measurementId: "G-7H1ZKVB2S2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return {
    app,
    analytics
  }
}