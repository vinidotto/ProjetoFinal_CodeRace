import express from "express";
import cors from "cors";
import appRouter from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", appRouter);

export default app;
