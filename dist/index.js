"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./util/dbConfig");
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL_ONLINE,
    collection: "sessions",
});
const port = 1200;
const app = (0, express_1.default)();
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", process.env.APP_URL_DEPLOY);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 24 * 60,
//       sameSite: "lax",
//       secure: false,
//       httpOnly: true,
//       domain: process.env.APP_URL_DEPLOY,
//     },
//     store,
//   })
// );
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.log("server connected");
    (0, dbConfig_1.dbConfig)();
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException: ", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
