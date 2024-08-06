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
exports.getTotalShoppingCart = exports.getProductById = exports.getShoppingCart = exports.postShoppingCart = void 0;
const database_1 = require("../database/database");
const postShoppingCart = (shoppingCart, id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`INSERT INTO "ShoppingCart" (customerId, productId, quantity, added_at) 
         VALUES ($1, $2, $3, $4) RETURNING *`, [id, shoppingCart.productId, shoppingCart.quantity, new Date()]);
    return response;
});
exports.postShoppingCart = postShoppingCart;
const getShoppingCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`    SELECT
        p.name,
        p.price,
        sc.quantity,
        p.stock,
        pd.description,
        pd.color,
        pd.year,
        pd.category,
        (sc.quantity * p.price) AS total
    FROM 
        "ShoppingCart" sc 
    JOIN
        "Product" p ON sc.productid = p.id 
    JOIN 
        "ProductDetails" pd ON p.description_id = pd.id 
    WHERE 
        sc.customerid = $1`, [id]);
    return response;
});
exports.getShoppingCart = getShoppingCart;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`SELECT * FROM "Product" WHERE id = $1`, [id]);
    return response;
});
exports.getProductById = getProductById;
const getTotalShoppingCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.pool.query(`	WITH ShoppingCartWithTotal AS (
    SELECT
        p.name,
        p.price,
        sc.quantity,
        p.stock,
        pd.description,
        pd.color,
        pd.year,
        pd.category,
        (sc.quantity * p.price) AS total
    FROM 
        "ShoppingCart" sc 
    JOIN
        "Product" p ON sc.productid = p.id 
    JOIN 
        "ProductDetails" pd ON p.description_id = pd.id 
    WHERE 
        sc.customerid = $1
)
SELECT (SELECT SUM(total) FROM ShoppingCartWithTotal) AS grand_total
FROM ShoppingCartWithTotal;`, [id]);
    return response;
});
exports.getTotalShoppingCart = getTotalShoppingCart;
