"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const productRouter = (0, express_1.Router)();
productRouter.post(`/post`, auth_middleware_1.authenticateToken, product_controller_1.productServicePostController);
productRouter.get(`/get`, auth_middleware_1.authenticateToken, product_controller_1.productServiceGetController);
exports.default = productRouter;
