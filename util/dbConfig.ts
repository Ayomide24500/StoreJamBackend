import env from "dotenv";
import { connect } from "mongoose";

env.config();

// const URL: string = "mongodb://localhost:27017/cart";
const URL1: string | any = process.env.MONGODB_URL_ONLINE!;

export const dbConfig = async () => {
  try {
    await connect(URL1)
      .then(() => {
        console.log("DB connected... ⭐👍");
      })
      .catch((err) => console.error());
  } catch (error) {
    return error;
  }
};
