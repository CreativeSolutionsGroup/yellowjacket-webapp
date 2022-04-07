import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
import { google } from "googleapis";
import { StudentModel } from "./models/Students";
import twilioCons from "twilio";
admin.initializeApp();
const sheets = google.sheets('v4')

const spreadsheetId = '1rR3W5C-7Fge5MX8MwWzU2uE3MU5x--JWqLyI64VL1yU'
const sheet = "SORTED";
const numberKeys = ["student_phone", "ra_phone", "sting_phone_1", "sting_phone_2", "sting_phone_3", "sting_phone_4", "sting_phone_5"] as const;
const keyTypes = ["STU", "RA", "STING", "STING", "STING", "STING", "STING"] as const;

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

const sendTwilioMessage = (payload: TwilioPayload) => {
const client = twilioCons(t_accountSid, t_authToken);
  client.messages.create(payload);
}

const sendMessagesToContacts = async (student: StudentModel) => {
  numberKeys.forEach((column, i) => {
    console.log(column);
    if (student[column]) {
      const studentNumber = formatNumberToE164(student[column]);

      if (!studentNumber) {
        return;
      }

      let payload: TwilioPayload = {
        to: studentNumber,
        from: formatNumberToE164(t_fromNumber!)!
      };

      const collection = keyTypes[i];

      if (collection === "RA") {
        payload.body = `Your resident ${student.first_name} ${student.last_name} has checked in and will arrive at the dorm soon! -STING`
      } else if (collection === "STING") {
        payload.body = `Your STING student ${student.first_name} ${student.last_name} has arrived! Please reach out to them in the next hour to welcome them to campus. -STING`;
      } else if (collection === "STU") {
        payload.body = `Hey ${student.first_name}! Welcome home. We are so excited that you're here, please continue to your residence hall! -STING`
      }

      sendTwilioMessage(payload);
    }
  });
}

export const checkInStudentById = functions.https.onCall(async (data, ctx) => {
  const student = data.student as StudentModel;
  if (student) {
    await sendMessagesToContacts(student);
  }

  return "success!"
});

export const getSheetData = functions.https.onCall(async (data, ctx) => {
  if (!ctx.auth || !ctx.auth.token) {
    return "Not allowed";
  }

  await jwtClient.authorize();

  const d = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId,
    range: `${sheet}!A1:M`
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