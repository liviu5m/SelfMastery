"use server";

import nodemailer from "nodemailer";

async function sendEmailApp({
  firstName,
  lastName,
  email,
  subject,
  body,
}: {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  subject: string | null;
  body: string | null;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (err) {
    console.log(err);
  }
  try {
    const sendResult = await transport.sendMail({
      from: email ?? "",
      to: "selfmastery5l@gmail.com",
      subject: subject == null ? "" : subject,
      html:
        body == null
          ? ""
          : `
      First Name: ${firstName}, Last Name: ${lastName}<br>
      Email: ${email}<br>
      Message: ${body}
      `,
    });
    return sendResult;
  } catch (err) {
    console.log(err);
  }
}

export const sendEmail = async (
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  subject: string | null,
  body: string | null
) => {
  const result = await sendEmailApp({
    firstName,
    lastName,
    email,
    subject,
    body,
  });
  return result;
};
