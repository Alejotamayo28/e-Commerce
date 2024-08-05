"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_validator_1 = require("../middlewares/validators/auth.validator");
const authRouter = (0, express_1.Router)();
authRouter.post(`/login`, auth_validator_1.validateAuthLogin, auth_controllers_1.authServiceLoginController);
authRouter.post(`/register`, auth_controllers_1.authServiceRegisterController);
exports.default = authRouter;
