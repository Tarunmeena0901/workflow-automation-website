import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC = 'zap-events'
const client = new PrismaClient()

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const producer = kafka.producer();
    await producer.connect();

    while (1) {
        const producerData = await client.zapRunOutbox.findMany({
            where: {},
            take: 10
        })

        await producer.send({
            topic: TOPIC,
            messages: producerData.map((r) => {
                return {
                    value: r.zapRunId
                }
            })
        })

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: producerData.map(r => r.id)
                }
            }
        })

    }
}

main();