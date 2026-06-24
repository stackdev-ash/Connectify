import express from 'express'
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import commentRoutes from './routes/comment.route';
import followRoutes from './routes/follow.routes';
import userRoutes from './routes/user.route'

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", followRoutes);
app.use("/api/users", userRoutes);

export default app;