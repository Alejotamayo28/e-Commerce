"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCacheProducts = exports.checkCache = void 0;
const redisClient_1 = require("./redisClient");
const checkCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = yield redisClient_1.redisClient.get('cachedData');
    if (cachedData) {
        res.send(JSON.parse(cachedData));
    }
    else {
        next();
    }
});
exports.checkCache = checkCache;
const checkCacheProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    if (!client)
        return res.status(303).json(`ERROR`);
    try {
        const data = yield redisClient_1.redisClient.get(req.user.id);
        if (data) {
            res.json(JSON.parse(data));
        }
        else {
            next();
        }
    }
    catch (err) {
        console.error('Error checking cache:', err);
        next();
    }
});
exports.checkCacheProducts = checkCacheProducts;
