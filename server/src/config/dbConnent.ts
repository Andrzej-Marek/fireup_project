import * as mongoose from "mongoose";
import { DB_NAME, DB_USER_NAME, DB_USER_PASSWORD, DB_HOST } from "./";

export const dbConnect = () => {
  mongoose
    .connect(
      `mongodb://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_HOST}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    )
    .then(() => console.log("Datebase connected"))
    .catch(err => console.log(err));
};
