"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const types_1 = require("../types");
const client_1 = require("../db/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const parsedData = types_1.SignupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "incorrect input"
        });
    }
    const userExists = yield client_1.prismaClient.user.findFirst({
        where: {
            email: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.username
        }
    });
    if (userExists) {
        return res.status(403).json({
            message: "user already exists"
        });
    }
    yield client_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    return res.json({
        message: "please verify your account email"
    });
}));
router.post("/signin", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "incorrect input"
        });
    }
    const user = yield client_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        return res.status(403).json({
            message: "incorrect credentials"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASSWORD);
    res.json({
        token: token
    });
}));
router.post("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const user = client_1.prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user
    });
}));
exports.userRouter = router;
