import express from 'express'
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;