import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
import { google } from "googleapis";
import { StudentModel } from "./models/Students";
import twilioCons from "twilio";
admin.initializeApp();

const sheets = google.sheets('v4')

const SPREADSHEET_ID = '1rR3W5C-7Fge5MX8MwWzU2uE3MU5x--JWqLyI64VL1yU'
const SORTED_SHEET = "SORTED";
const CHECKIN_SHEET = "CHECK-INS";
const NUMBER_KEYS = ["student_phone", "ra_phone", "sting_phone_1", "sting_phone_2", "sting_phone_3", "sting_phone_4", "sting_phone_5"] as const;
const KEY_TYPES = ["STU", "RA", "STING", "STING", "STING", "STING", "STING"] as const;

const t_fromNumber = process.env.TWILIO_FROM_NUMBER;
const t_accountSid = process.env.TWILIO_ACCOUNT_SID;
const t_authToken = process.env.TWILIO_AUTH_TOKEN;


const jwtClient = new google.auth.JWT({
  email: process.env.EMAIL,
  key: process.env.PKEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

interface TwilioPayload {
  to: string,
  body?: string,
  from: string
}

/**
 * function formats a phone number according to the E-164 standard
 *  returns null if number is invalid
 * 
 * ex:  012-345-6789 -> +10123456789
 *      1-012-345-6789 -> +10123456789
 *      33-012-345-6789 -> +330123456789
 */
function formatNumberToE164(phone: string) {
  let formatted = phone.trim().split('-').join('');
  if (formatted.length == 10) {
    formatted = '+1' + formatted;
  } else {
    formatted = '+' + formatted;
  }
  if (formatted.length == 12 || formatted.length == 13) {
    return formatted;
  }
  return null;
}

const sendTwilioMessage = async (payload: TwilioPayload) => {
  const client = twilioCons(t_accountSid, t_authToken);
  return await client.messages.create(payload);
}

/**
 * @author Spencer Bills
 * @param student The student that contains the contacts
 * @returns the number of failed or success messages sent.
 */
const sendMessagesToContacts = async (student: StudentModel) => {
  // return obj
  var data = {
    failed: 0,
    success: 0
  };

  await Promise.all(NUMBER_KEYS.map(async (column, i) => {
    if (student[column]) {
      const studentNumber = formatNumberToE164(student[column]);

      if (!studentNumber) {
        return;
      }

      let payload: TwilioPayload = {
        to: studentNumber,
        from: formatNumberToE164(t_fromNumber!)!
      };

      const collection = KEY_TYPES[i];

      if (collection === "RA") {
        payload.body = `Your resident ${student.first_name} ${student.last_name} has checked in and will arrive at the dorm soon! -STING`
      } else if (collection === "STING") {
        payload.body = `Your STING student ${student.first_name} ${student.last_name} has arrived! Please reach out to them in the next hour to welcome them to campus. -STING`;
      } else if (collection === "STU") {
        payload.body = `Hey ${student.first_name}! Welcome home. We are so excited that you're here, please continue to your residence hall! -STING`
      }

      try {
        const inst = await sendTwilioMessage(payload);
        data.success++;
        return inst;
      } catch (e) {
        console.error(e);
        data.failed++;
      }
    }

    return null;
  }));

  return data;
};

/**
 * 
 * @param student The student to add to the contacts
 * @param messages The number of message successes 
 * @param errored The number of failures
 * @returns the append row result from google api.
 */
const addStudentToCheckIn = async (student: StudentModel, messages: number, errored: number) => {
  const timestamp = new Date().toISOString();

  await jwtClient.authorize();

  const d = await sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${CHECKIN_SHEET}!A:D`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [timestamp, student.student_id, messages, errored]
      ]
    }
  });

  return d;

}

export const checkInStudentById = functions.https.onCall(async (data, ctx) => {
  if (!ctx.auth || !ctx.auth.token) {
    return "Not Logged In";
  }

  const student = data.student as StudentModel;
  if (student) {
    const messagesSent = await sendMessagesToContacts(student);
  // const messagesSent = { success: 5, failed: 6}
    await addStudentToCheckIn(student, messagesSent.success, messagesSent.failed);
  }

  return "success!"
});

export const getCheckInData = functions.https.onCall(async (data, ctx) => {
  if (!ctx.auth || !ctx.auth.token) {
    return "Not allowed";
  };

  await jwtClient.authorize();

  const d = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${CHECKIN_SHEET}!A1:D`
  });

  const values = d.data.values!;
  const headers = values[0] as string[];

  const checkIns = values.slice(1).map(row => {
    const checkIn = {} as any;
    row.map((item, i) => {
      checkIn[headers[i]] = item;
    });
    return checkIn;
  });

  return checkIns;
})

export const getSheetData = functions.https.onCall(async (data, ctx) => {
  if (!ctx.auth || !ctx.auth.token) {
    return "Not allowed";
  }

  await jwtClient.authorize();

  const d = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${SORTED_SHEET}!A1:M`
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