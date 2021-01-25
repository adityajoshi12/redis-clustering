const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Redis = require("ioredis");

const host1 = process.env.SENTINEL_HOST1;
const host2 = process.env.SENTINEL_HOST2;
const host3 = process.env.SENTINEL_HOST3;
const port = process.env.REDIS_PORT;
console.log(process.env);
const redis = new Redis({
  db: 0,
  password: "a-very-complex-password-here",
  sentinels: [
    { host: host1, port: port },
    { host: host2, port: port },
    { host: host3, port: port },
  ],
  name: "mymaster",
});

let timestamp = 0;
app.get("/", (req, res) => {
  Date.now();
  redis.set("counter", timestamp);
  res.send(timestamp.toString());
});

app.listen(80);
