"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const shoppingCart_controller_1 = require("../controllers/shoppingCart.controller");
const shoppingCart = (0, express_1.Router)();
shoppingCart.post(`/addProduct`, auth_middleware_1.authenticateToken, shoppingCart_controller_1.postShoppingCartController);
exports.default = shoppingCart;
