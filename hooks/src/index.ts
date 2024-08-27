import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

//http url

app.post("/hooks/catch/:userId/:zapId", async (req,res) => {
    const zapId = req.params.zapId;
    const userId = req.params.userId;
    const body = req.body;

    await client.$transaction(async (tx)=> {
        const run = await client.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });
        await client.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })

    })

    res.json({
        message: "webhook recieved"
    })

})

app.listen(3002);