import { app } from "./app.js";
import { connectToDb } from "./dbConnection.js";
import dotenv from "dotenv";
import { adminSeeder } from "./seeder/adminSeeder.js";
dotenv.config();
connectToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      adminSeeder()
      console.log("server and db started successfully");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
