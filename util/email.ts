import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_ID = process.env.GOOGLE_ID!;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL!;
const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH!;

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });

const URL: string = `http://localhost:1200`;

export const sendEmail = async (admin: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ayomideadisa83@gmail.com",
        clientSecret: GOOGLE_SECRET,
        clientId: GOOGLE_ID,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      "secretCode",
      {
        expiresIn: "5m",
      }
    );

    const getFile = path.join(__dirname, "../views/index.ejs");

    const data = {
      token: admin.token,
      email: admin.email,
      name: admin.firstName,
      url: `${URL}/verify/${token}`,
    };

    const html = await ejs.renderFile(getFile, { data });

    const mailer = {
      from: "jam collections 🚀👍hh ",
      to: admin.email,
      subject: "Account Opening",
      html,
    };

    await transport.sendMail(mailer).then(() => {
      console.log("send");
    });
  } catch (error: any) {
    console.log(error.message);

    return error;
  }
};

// export const sendResetPasswordEmail = async (user: any) => {
//   try {
//     const accessToken: any = (await oAuth.getAccessToken()).token;

//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "ayomideadisa83@gmail.com",
//         clientSecret: GOOGLE_SECRET,
//         clientId: GOOGLE_ID,
//         refreshToken: GOOGLE_REFRESH,
//         accessToken,
//       },
//     });
//     const getFile = path.join(__dirname, "../views/resetPassword.ejs");

//     const data = {
//       token: user.token,
//       email: user.email,
//       url: `${URL}/user-verify/${user._id}`,
//     };

//     const html = await ejs.renderFile(getFile, { data });

//     const mailer = {
//       from: "Ayomide 🚀👍 <ayomideadisa83@gmail.com>",
//       to: user.email,
//       subject: "Account Opening",
//       html,
//     };

//     await transport.sendMail(mailer).then(() => {
//       console.log("send reset");
//     });
//   } catch (error) {
//     return error;
//   }
// };
