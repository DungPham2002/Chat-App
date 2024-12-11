import express from "express";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import cookieParser from "cookie-parser";
import fileRoutes from "./routes/file.route";
import messageRoutes from "./routes/message.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
  connectDB();
});
