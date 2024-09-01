"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./routers/userRouter");
const zapRouter_1 = require("./routers/zapRouter");
const actionRouter_1 = require("./routers/actionRouter");
const triggerRouter_1 = require("./routers/triggerRouter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", userRouter_1.userRouter);
app.use("/api/v1/zap", zapRouter_1.zapRouter);
app.use("/api/v1/action", actionRouter_1.actionRouter);
app.use("/api/v1/trigger", triggerRouter_1.triggerRouter);
app.listen(3001);
