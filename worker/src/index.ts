import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { JsonObject } from "@prisma/client/runtime/library";
import { sendEmail } from "./email";
import { sendSol } from "./solana";
require('dotenv').config();

const TOPIC = 'zap-events'
const prismaClient = new PrismaClient()

const kafka = new Kafka({
    clientId: 'worker',
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' })
    await consumer.connect()
    await consumer.subscribe({ topic: TOPIC, fromBeginning: true })
    const producer = kafka.producer();
    await producer.connect();

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {

          if(!message.value?.toString()){
            console.log("no vlaue recieved in message");
            return;
          }
          
          console.log({
            partition,
            offset: message.offset,
            value: message?.value.toString(),
          })

          const parsedValue = JSON.parse(message.value?.toString());
          const zapRunId = parsedValue.zapRunId;
          const stage = parsedValue.stage;

          const zapRunDetails = await prismaClient.zapRun.findFirst({
            where: {
              id: zapRunId
            },
            include : {
              zap : {
                include: {
                  actions : {
                    include : {
                      type : true
                    }
                  }
                }
              }
            }
          })

          const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

          if (!currentAction) {
            console.log("Current action not found?");
            return;
          }

          const zapMetadata = zapRunDetails?.metadata;

          if(currentAction?.actionId == "email"){
            const body = parse((currentAction.metadata as JsonObject).body as string , zapMetadata);
            const to  = parse((currentAction.metadata as JsonObject).to as string, zapMetadata);
            console.log(`Sending out email to ${to} body is ${body}`)
            await sendEmail(to, body);;
          }
          if(currentAction?.actionId == "send-sol"){
            const amount = parse((currentAction.metadata as JsonObject).amount as string , zapMetadata);
            const address  = parse((currentAction.metadata as JsonObject).address as string, zapMetadata);
            console.log(`Sending out SOL of ${amount} to address ${address}`);
            await sendSol(address, amount);
          }
          await new Promise(r => setTimeout(r,4000));

          const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;
          if(lastStage != stage){
            console.log("this is not the last stage, pushing again to queue");
            producer.send({
              topic: TOPIC,
              messages: [{
                value: JSON.stringify({
                  stage: stage + 1,
                  zapRunId
                })
              }]
            })
                      
          }

          console.log("processing done");

          await consumer.commitOffsets([{
            topic,
            partition,
            offset: (Number(message.offset) + 1).toString()
          }])
        },
      })
}

main();