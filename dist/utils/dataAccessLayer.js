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
exports.onSession = exports.onTransaction = void 0;
const database_1 = require("../database/database");
const newSession = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.pool.connect();
});
const closeSession = (client) => __awaiter(void 0, void 0, void 0, function* () {
    return client.release(true);
});
const onTransaction = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield newSession();
    try {
        yield client.query('BEGIN');
        const result = yield callback(client);
        yield client.query('COMMIT');
        return result;
    }
    catch (error) {
        yield client.query('ROLLBACK');
        throw error;
    }
    finally {
        yield closeSession(client);
    }
});
exports.onTransaction = onTransaction;
const onSession = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield newSession();
    try {
        const result = yield callback(client);
        return result;
    }
    catch (error) {
        console.error("OPERATION FAILED", {}, error);
        throw error;
    }
    finally {
        yield closeSession(client);
    }
});
exports.onSession = onSession;
