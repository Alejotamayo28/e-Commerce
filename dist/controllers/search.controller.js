"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServiceGetCategoryController = void 0;
const errors_1 = require("../errors");
const search_service_1 = require("../services/search.service");
const searchServiceGetCategoryController = (req, res) => {
    try {
        new search_service_1.SearchService(req, res).priceSearch();
    }
    catch (e) {
        (0, errors_1.errorMessage)(e, res);
    }
};
exports.searchServiceGetCategoryController = searchServiceGetCategoryController;
