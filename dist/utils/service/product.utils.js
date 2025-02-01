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
class ProductUtils {
    static getProducts(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield client.query(`SELECT * FROM "Product"`);
            return response;
        });
    }
    static getProductById(client, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield client.query(`SELECT * FROM "Product" WHERE id = $1`, [id]);
            return response.rows[0];
        });
    }
    static insertProductDetails(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO "ProductDetails" (description, color, year, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
            const values = [data.description, data.color, data.year, data.category];
            const { rows: [productDetails] } = yield client.query(query, values);
            return productDetails;
        });
    }
    static insertProduct(client, data, descriptionId, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO "Product" (name, price, stock, description_id, seller_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
            const values = [data.name, data.price, data.stock, descriptionId, sellerId];
            const { rows: [product] } = yield client.query(query, values);
            return product;
        });
    }
    static constructProductResponse(product, details) {
        return {
            name: product.name,
            price: product.price,
            stock: product.stock,
            details: {
                description: details.description,
                color: details.color,
                year: details.year,
                category: details.category
            }
        };
    }
}
exports.ProductUtils = ProductUtils;
