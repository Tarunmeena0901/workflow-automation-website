import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post("/signup",async (req,res)=> {
    const body  = req.body;
    const parsedData = SignupSchema.safeParse(body)

    if(!parsedData.success){
        return res.status(411).json({
            message: "incorrect input"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.username
        }
    })

    if(userExists){
        return res.status(403).json({
            message: "user already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name || ""
        }
    })

    return res.json({
        message: "please verify your account email"
    })

})

router.post("/signin" ,async (req,res)=> {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body)

    if(!parsedData.success){
        return res.status(411).json({
            message: "incorrect input"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user){
        return res.status(403).json({
            message: "incorrect credentials"
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD)

    res.json({
        token: token
    })
}
)

router.post("/" ,async (req,res)=> {
    //@ts-ignore
    const id = req.id;

    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    })

    return res.json({
        user
    })
}
)

export const userRouter = router;
