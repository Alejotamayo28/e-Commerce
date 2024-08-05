"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const search_controller_1 = require("../controllers/search.controller");
const searchRouter = (0, express_1.Router)();
searchRouter.get(`/find/:filter`, auth_middleware_1.authenticateToken, search_controller_1.searchServiceGetCategoryController);
exports.default = searchRouter;
