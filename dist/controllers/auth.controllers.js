"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceRegisterController = exports.authServiceLoginController = void 0;
const auth_service_1 = require("../services/auth.service");
const errors_1 = require("../errors");
const authServiceLoginController = (req, res) => {
    try {
        new auth_service_1.AuthService(req, res).login(req.body);
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.authServiceLoginController = authServiceLoginController;
const authServiceRegisterController = (req, res) => {
    try {
        new auth_service_1.AuthService(req, res).register(req.body);
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.authServiceRegisterController = authServiceRegisterController;
