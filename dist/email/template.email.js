"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_email_1 = require("./config.email");
exports.transporter = nodemailer_1.default.createTransport({
    host: config_email_1.emailData.smtp,
    port: 465,
    secure: true,
    auth: {
        user: config_email_1.emailData.user,
        pass: config_email_1.emailData.password,
    },
});
