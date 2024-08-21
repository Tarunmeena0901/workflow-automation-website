import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC = 'zap-events'
const client = new PrismaClient()

const kafka = new Kafka({
    clientId: 'worker',
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' })
    await consumer.connect()
    await consumer.subscribe({ topic: TOPIC, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
          })

          await new Promise(r => setTimeout(r,4000));

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