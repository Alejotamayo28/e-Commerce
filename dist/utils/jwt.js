"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClient = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (id) => {
    const jwt = (0, jsonwebtoken_1.sign)({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, process.env.JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
// Lo puedo usar manejandolo como una arrow function
const verifyClient = (client) => {
    if (!client) {
        return false;
    }
    return true;
};
exports.verifyClient = verifyClient;
