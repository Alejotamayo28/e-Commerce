"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServiceGetController = exports.productServicePostController = void 0;
const product_service_1 = require("../services/product.service");
const productServicePostController = (req, res) => {
    try {
        new product_service_1.ProductService(req, res).createProduct(req.body);
    }
    catch (e) {
        console.error(e);
    }
};
exports.productServicePostController = productServicePostController;
const productServiceGetController = (req, res) => {
    try {
        new product_service_1.ProductService(req, res).getProducts();
    }
    catch (e) {
        console.error(e);
    }
};
exports.productServiceGetController = productServiceGetController;
