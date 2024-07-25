"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.get(`/get`, auth_middleware_1.authenticateToken, order_controller_1.orderServicePurchaseController);
exports.default = orderRouter;
