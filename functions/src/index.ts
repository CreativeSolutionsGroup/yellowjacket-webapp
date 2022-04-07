import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
import { google } from "googleapis";
admin.initializeApp();
const sheets = google.sheets('v4')

const spreadsheetId = '1rR3W5C-7Fge5MX8MwWzU2uE3MU5x--JWqLyI64VL1yU'

const jwtClient = new google.auth.JWT({
  email: process.env.EMAIL,
  key: process.env.PKEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const getSheetData = functions.https.onCall(async (data, ctx) => {
  // make sure authed
  if (!ctx.auth || !ctx.auth.token) {
    return "Not allowed";
  }

  await jwtClient.authorize();

  const d = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId,
    range: 'SORTED!A1:M'
  });

  const values = d.data.values!;
  const headers = values[0] as string[];

  const students = values.slice(1).map(row => {
    const student = {} as any;
    row.map((item, i) => {
      student[headers[i]] = item;
    });
    return student;
  });

  return students;
});