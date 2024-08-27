import express from "express";
import cors from 'cors';
import { userRouter } from "./routers/userRouter";
import { zapRouter } from "./routers/zapRouter";
import { actionRouter } from "./routers/actionRouter";
import { triggerRouter } from "./routers/triggerRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/action", actionRouter);
app.use("/api/v1/trigger", triggerRouter);


app.listen(3001);