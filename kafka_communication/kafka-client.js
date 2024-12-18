const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kafsender-api',
  brokers: ['kafka:9092'],
  connectionTimeout: 20_000,
  authenticationTimeout: 5_000,
  ssl: false,
  sasl: {
    mechanism: process.env.KAFKA_SECURITY_MECHANISM,
    username: process.env.KAFKA_SECURITY_USERNAME,
    password: process.env.KAFKA_SECURITY_PASSWORD,
  },
});

module.exports = { kafka };
