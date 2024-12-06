import express from "express";
import authRoute from "./routes/auth.route";


const app = express();
const port = 3001;

app.use(express.json());

app.use("/api/auth", authRoute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
