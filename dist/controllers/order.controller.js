"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServiceGetRecordController = exports.orderServicePurchaseController = void 0;
const order_service_1 = require("../services/order.service");
const errors_1 = require("../errors");
const orderServicePurchaseController = (req, res) => {
    try {
        new order_service_1.OrderService(req, res).createPurchase(req.body);
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.orderServicePurchaseController = orderServicePurchaseController;
const orderServiceGetRecordController = (req, res) => {
    try {
        new order_service_1.OrderService(req, res).getPurchaseRecords();
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.orderServiceGetRecordController = orderServiceGetRecordController;
