const { kafka } = require('./kafka-client');

const consumer = kafka.consumer({
  groupId: 'sample-consumer-group',
  heartbeatInterval: 3000,
  sessionTimeout: 10000,
})

function consumeMessage({ message, topic, partition }) {
  console.log("Consuming My message:")
  console.log({
    value: message.value.toString(),
    topic,
    partition,
    offset: message.offset,
  });
}

consumer.connect().then(async () => {
  await consumer.subscribe({ topic: 'sample-topic' });
  await consumer.run({
    autoCommit: true,
    eachMessage: consumeMessage,
  });
})