import { Request, Response, Router } from "express";
import { prismaClient } from "../db/client";

const router = Router();

router.get("/available", (req : Request, res: Response) => {
    const availableAction = prismaClient.availableAction.findMany({});
    res.json({availableAction})
})

export const actionRouter = router;