"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServiceGetController = exports.productServicePostController = void 0;
const product_service_1 = require("../services/product.service");
const errors_1 = require("../errors");
const productServicePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService(req, res);
    try {
        yield productService.createProduct(req.body);
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
});
exports.productServicePostController = productServicePostController;
const productServiceGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new product_service_1.ProductService(req, res);
    try {
        yield productService.getProducts();
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
});
exports.productServiceGetController = productServiceGetController;
