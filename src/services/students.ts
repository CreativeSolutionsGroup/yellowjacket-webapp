import axios from "axios";
import { connectFunctionsEmulator, Functions, getFunctions, httpsCallable } from "firebase/functions";


export const getGoogleSheetJSON = async (sheetId: string = "1rR3W5C-7Fge5MX8MwWzU2uE3MU5x--JWqLyI64VL1yU", tab: string = "SORTED") => {
  
}

export const getAllSortedStudents = async (fn: Functions = getFunctions()) => {
  connectFunctionsEmulator(fn, "localhost", 5001);
  console.log("hit")
  console.log(await httpsCallable(fn, "getSheetData")());
  console.log("end");
}