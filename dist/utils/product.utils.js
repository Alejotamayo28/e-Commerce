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
exports.getProductById = exports.ProductUtils = void 0;
const database_1 = require("../database/database");
class ProductUtils {
    static getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`SELECT * FROM "Product"`);
            return response;
        });
    }
    createProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows: [productDetails] } = yield database_1.pool.query(`INSERT INTO "ProductDetails" (description, color, year, category) VALUES ($1, $2, $3, $4) RETURNING *`, [data.details.description, data.details.color, data.details.year, data.details.category]);
            const { rows: [product] } = yield database_1.pool.query(`INSERT INTO "Product" (name,  price, stock, description_id, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [data.name, data.price, data.stock, productDetails.id, id]);
            return {
                name: product.name,
                price: product.price,
                stock: product.stock,
                details: {
                    description: productDetails.description,
                    color: productDetails.color,
                    year: productDetails.year,
                    category: productDetails.category
                }
            };
        });
    }
}
exports.ProductUtils = ProductUtils;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM "Product" WHERE id = $1`, [id]);
    return response.rows[0];
});
exports.getProductById = getProductById;
