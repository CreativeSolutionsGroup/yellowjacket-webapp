import axios from "axios";
import { getAuth } from "firebase/auth";
import { connectFunctionsEmulator, Functions, getFunctions, httpsCallable } from "firebase/functions";
import { CheckIn } from "../models/CheckIns";
import { StudentModel } from "../models/Students";


export const getGoogleSheetJSON = async (sheetId: string = "1rR3W5C-7Fge5MX8MwWzU2uE3MU5x--JWqLyI64VL1yU", tab: string = "SORTED") => {
  
}

export const checkInStudent = async (student: StudentModel, fn: Functions = getFunctions()) => {
  // connectFunctionsEmulator(fn, "localhost", 5001);
  const httpsData = await httpsCallable(fn, "checkInStudentById")({student: student});
  return httpsData.data;
}

export const getAllSortedStudents = async (fn: Functions = getFunctions(), auth =  getAuth()): Promise<Array<StudentModel>> => {
  // connectFunctionsEmulator(fn, "localhost", 5001);
  const httpsData = await axios.get("getSheetData", {
    headers: {
      Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
    }
  });
  return httpsData.data as Array<StudentModel>;
}

export const getAllCheckedIn = async (fn :Functions = getFunctions(), auth =  getAuth()) => {
  // connectFunctionsEmulator(fn, "localhost", 5001);
  const httpsData = await axios.get("getCheckInData", {
    headers: {
      Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`
    }
  });
  return httpsData.data as Array<CheckIn>;
}