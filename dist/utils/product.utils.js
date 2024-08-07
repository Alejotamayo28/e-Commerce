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
    createProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const description = yield database_1.pool.query(`INSERT INTO "ProductDetails" (description, color, year, category) VALUES ($1, $2, $3, $4) RETURNING *`, [productData.description, productData.color, productData.year, productData.category]);
            const product = yield database_1.pool.query(`INSERT INTO "Product" (name,  price, stock, description_id, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [productData.name, productData.price, productData.stock, description.rows[0].id, id]);
            const producto = {
                name: product.rows[0].name,
                price: product.rows[0].price,
                stock: product.rows[0].stock,
                description: description.rows[0].description,
                color: description.rows[0].color,
                year: description.rows[0].year,
                category: description.rows[0].category
            };
            return producto;
        });
    }
}
exports.ProductUtils = ProductUtils;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM "Product" WHERE id = $1`, [id]);
    return response.rows[0];
});
exports.getProductById = getProductById;
