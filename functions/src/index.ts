import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
import { GoogleSpreadsheet } from "google-spreadsheet";
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

export const getSheetDataLib = functions.https.onCall(async (data, ctx) => {
  functions.logger.log("Begin Execution")

  const doc = new GoogleSpreadsheet(spreadsheetId);

  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL as string,
    private_key: process.env.PKEY as string,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle["SORTED"];
  const rows = await sheet.getRows();

  functions.logger.log("Finished Execution")

  console.log();

  return rows[0];
});