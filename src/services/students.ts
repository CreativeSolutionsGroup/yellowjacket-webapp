import axios from "axios";
import { connectFunctionsEmulator, Functions, getFunctions, httpsCallable } from "firebase/functions";
import { StudentModel } from "../models/students";


export const getGoogleSheetJSON = async (sheetId: string = "1rR3W5C-7Fge5MX8MwWzU2uE3MU5x--JWqLyI64VL1yU", tab: string = "SORTED") => {
  
}

export const checkInStudent = async (student: StudentModel, fn: Functions = getFunctions()) => {
  // connectFunctionsEmulator(fn, "localhost", 5001);
  const httpsData = await httpsCallable(fn, "checkInStudentById")({student: student});
  return httpsData.data;
}

export const getAllSortedStudents = async (fn: Functions = getFunctions()): Promise<Array<StudentModel>> => {
  // connectFunctionsEmulator(fn, "localhost", 5001);
  const httpsData = await httpsCallable(fn, "getSheetData")();
  return httpsData.data as Array<StudentModel>;
}