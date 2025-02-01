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
exports.getProductsByCategoryAndPrice = exports.getProductsByPrice = exports.getProductsByCategory = void 0;
const dataAccessLayer_1 = require("../dataAccessLayer");
const getProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, dataAccessLayer_1.onSession)((client) => __awaiter(void 0, void 0, void 0, function* () {
        return yield client.query(`SELECT 
      "Product".id as product_id,
      "Product".name,
      "Product".price,
      "Product"."stock",
      "ProductDetails".description,
      "ProductDetails".color,
      "ProductDetails"."year",
      "ProductDetails".category
    FROM
      "ProductDetails"
    JOIN
      "Product" ON "ProductDetails".id = "Product".description_id
    WHERE 
      "ProductDetails".category = $1`, [category]);
    }));
    return response;
});
exports.getProductsByCategory = getProductsByCategory;
const getProductsByPrice = (price) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, dataAccessLayer_1.onSession)((client) => __awaiter(void 0, void 0, void 0, function* () {
        return yield client.query(`SELECT 
    "ProductDetails".id,
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails"."year",
    "ProductDetails".category,
    "Product".name,
    "Product".price,
    "Product".stock
FROM
    "ProductDetails"
JOIN
    "Product" ON "ProductDetails".id = "Product".description_id
WHERE 
	"Product".price <= $1`, [price]);
    }));
    return response;
});
exports.getProductsByPrice = getProductsByPrice;
const getProductsByCategoryAndPrice = (category, price) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, dataAccessLayer_1.onSession)((client) => __awaiter(void 0, void 0, void 0, function* () {
        return yield client.query(`SELECT 
    "ProductDetails".id,
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails"."year",
    "ProductDetails".category,
    "Product".name,
    "Product".price,
    "Product".stock
FROM
    "ProductDetails"
JOIN
    "Product" ON "ProductDetails".id = "Product".description_id
WHERE 
	"Product".price <= $1 AND "ProductDetails".category = $2`, [price, category]);
    }));
    return response;
});
exports.getProductsByCategoryAndPrice = getProductsByCategoryAndPrice;
