"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
exports.redisClient = new ioredis_1.Redis({
    host: 'redis-17889.c284.us-east1-2.gce.redns.redis-cloud.com',
    port: 17889,
    password: '2geD1ChkmlRqEbgZm9LiZmJ7C7EYnLsg'
});
exports.redisClient.on(`connect`, () => {
    console.log(`Connected to Redis`);
});
exports.redisClient.on(`error`, (e) => {
    console.log(`Error connecting to Redis: `, e);
});
