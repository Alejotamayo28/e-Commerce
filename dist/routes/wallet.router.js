"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const wallet_controller_1 = require("../controllers/wallet.controller");
const walletRouter = (0, express_1.Router)();
walletRouter.post(`/post`, auth_middleware_1.authenticateToken, wallet_controller_1.wallerServicePostController);
walletRouter.put(`/put`, auth_middleware_1.authenticateToken, wallet_controller_1.walletServicePutController);
exports.default = walletRouter;
