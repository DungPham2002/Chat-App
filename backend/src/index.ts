import express from "express";
import authRoute from "./routes/auth.route";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import cookieParser from "cookie-parser";
import fileRoute from "./routes/file.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/file", fileRoute);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});
