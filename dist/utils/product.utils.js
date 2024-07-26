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
exports.ProductUtils = void 0;
const database_1 = require("../database/database");
class ProductUtils {
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`SELECT * FROM "Product"`);
            return response;
        });
    }
    createProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`INSERT INTO "Product" (name,  price, stock, description, color, year, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [productData.name, productData.price, productData
                    .stock, productData.description, productData.color, productData.year, id]);
            return response;
        });
    }
}
exports.ProductUtils = ProductUtils;
