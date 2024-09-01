import { Request, Response, Router } from "express";
import { prismaClient } from "../db/client";

const router = Router();

router.get("/available",async (req : Request, res: Response) => {
    const availableTriggers = await prismaClient.availableTrigger.findMany({});
    res.json({availableTriggers})
})

export const triggerRouter = router;