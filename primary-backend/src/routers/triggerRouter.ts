import { Request, Response, Router } from "express";
import { prismaClient } from "../db/client";

const router = Router();

router.get("/available", (req : Request, res: Response) => {
    const availableTrigger = prismaClient.availableTrigger.findMany({});
    res.json({availableTrigger})
})

export const triggerRouter = router;