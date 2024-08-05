"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postShoppingCartController = void 0;
const errors_1 = require("../errors");
const shoppingCart_service_1 = require("../services/shoppingCart.service");
const postShoppingCartController = (req, res) => {
    try {
        new shoppingCart_service_1.ShoppingCartService(req, res).addProduct(req.body);
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.postShoppingCartController = postShoppingCartController;
