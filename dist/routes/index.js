"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_Router_1 = __importDefault(require("./auth.Router"));
const product_router_1 = __importDefault(require("./product.router"));
const order_router_1 = __importDefault(require("./order.router"));
const wallet_router_1 = __importDefault(require("./wallet.router"));
const search_router_1 = __importDefault(require("./search.router"));
const mainRouter = (0, express_1.Router)();
mainRouter.use(`/auth`, auth_Router_1.default);
mainRouter.use(`/product`, product_router_1.default);
mainRouter.use(`/order`, order_router_1.default);
mainRouter.use(`/wallet`, wallet_router_1.default);
mainRouter.use(`/search`, search_router_1.default);
exports.default = mainRouter;
