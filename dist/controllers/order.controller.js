"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServicePurchaseController = void 0;
const order_service_1 = require("../services/order.service");
const orderServicePurchaseController = (req, res) => {
    try {
        new order_service_1.OrderService(req, res).createPurchase(req.body);
    }
    catch (e) {
        console.error(e);
    }
};
exports.orderServicePurchaseController = orderServicePurchaseController;
