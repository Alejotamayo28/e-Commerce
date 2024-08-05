"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByPriceAndCategoryController = exports.getPriceProductsController = exports.getCategoryProductsController = void 0;
const errors_1 = require("../errors");
const search_service_1 = require("../services/search.service");
const getCategoryProductsController = (req, res) => {
    try {
        new search_service_1.SearchService(req, res).categorySearch();
    }
    catch (e) {
        (0, errors_1.errorMessage)(e, res);
    }
};
exports.getCategoryProductsController = getCategoryProductsController;
const getPriceProductsController = (req, res) => {
    try {
        new search_service_1.SearchService(req, res).priceSearch();
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.getPriceProductsController = getPriceProductsController;
const getProductsByPriceAndCategoryController = (req, res) => {
    try {
        new search_service_1.SearchService(req, res).categoryPriceSearch();
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
};
exports.getProductsByPriceAndCategoryController = getProductsByPriceAndCategoryController;
