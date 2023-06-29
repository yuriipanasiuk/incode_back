import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/auth";
import swaggerDocument from "./swagger.json";

config();

const app = express();
const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(formatLogger));

app.use("/auth", authRouter);
app.use("/auth-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { status = 500 } = err;

  return res.status(status).json({ message: err.message });
});

export default app;
