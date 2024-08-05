"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServiceGetController = exports.productServicePostController = void 0;
const product_service_1 = require("../services/product.service");
const errors_1 = require("../errors");
const productServicePostController = (req, res) => {
    try {
        res.set('Cache-Control', 'public, max-age=3600');
        new product_service_1.ProductService(req, res).createProduct(req.body);
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.productServicePostController = productServicePostController;
const productServiceGetController = (req, res) => {
    try {
        new product_service_1.ProductService(req, res).getProducts();
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.productServiceGetController = productServiceGetController;
