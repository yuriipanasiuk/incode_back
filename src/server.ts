import mongoose from "mongoose";
import app from "./app";

const DB_HOST:string = process.env.DB_HOST as string;
const PORT:string = process.env.PORT as string;

mongoose
  .connect(DB_HOST, {
    connectTimeoutMS: 1000
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server working on ${PORT} port`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
