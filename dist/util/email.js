"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH;
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URL);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
const URL = `http://localhost:1200`;
const sendEmail = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
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
        const token = jsonwebtoken_1.default.sign({
            id: admin._id,
            email: admin.email,
        }, "secretCode", {
            expiresIn: "5m",
        });
        const getFile = path_1.default.join(__dirname, "../views/index.ejs");
        const data = {
            token: admin.token,
            email: admin.email,
            name: admin.firstName,
            url: `${URL}/verify/${token}`,
        };
        const html = yield ejs_1.default.renderFile(getFile, { data });
        const mailer = {
            from: "jam collections 🚀👍 ",
            to: admin.email,
            subject: "Account Opening",
            html,
        };
        yield transport.sendMail(mailer).then(() => {
            console.log("send");
        });
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
exports.sendEmail = sendEmail;
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
