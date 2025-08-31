import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import { mainApp } from "./mainApp";
import { dbConfig } from "./util/dbConfig";
import MongoDB from "connect-mongodb-session";
import dotenv from "dotenv";
dotenv.config();

const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL_ONLINE!,
  collection: "sessions",
});

const port: any = 1200;

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "jam-collections.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: "jam-collections.vercel.app",
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 24 * 60,
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      domain: "jam-collections.vercel.app",
    },

    store,
  })
);

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mainApp(app);

const server = app.listen(port, () => {
  console.log("server connected");
  console.clear();
  dbConfig();
});

process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException: ", err);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
