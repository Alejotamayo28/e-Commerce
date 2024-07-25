"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceRegisterController = exports.authServiceLoginController = void 0;
const auth_service_1 = require("../services/auth.service");
const authServiceLoginController = (req, res) => {
    try {
        new auth_service_1.AuthService(req, res).login(req.body);
    }
    catch (e) {
        console.error(e);
    }
};
exports.authServiceLoginController = authServiceLoginController;
const authServiceRegisterController = (req, res) => {
    try {
        new auth_service_1.AuthService(req, res).register(req.body);
    }
    catch (e) {
        console.error(e);
    }
};
exports.authServiceRegisterController = authServiceRegisterController;
