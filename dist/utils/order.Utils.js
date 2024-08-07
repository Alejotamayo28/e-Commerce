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
exports.OrderUtils = void 0;
const database_1 = require("../database/database");
class OrderUtils {
    constructor(res) {
        this.res = res;
    }
    static createPurchaseRecord(customerId, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchaseResult = yield database_1.pool.query(`INSERT INTO "Purchase" (customerId, total) VALUES ($1, $2) RETURNING *`, [customerId, total]);
            return purchaseResult.rows[0];
        });
    }
    static createPurchaseProductRecord(purchaseId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query(`INSERT INTO "PurchaseProduct" (purchaseId, productId, quantity) VALUES ($1, $2, $3)`, [purchaseId, productId, quantity]);
        });
    }
    static updateProductStock(productId, newStock) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query(`UPDATE "Product" SET stock = $1 WHERE id = $2`, [newStock, productId]);
        });
    }
    static updateWalletBalance(customerId, newBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query(`UPDATE "Wallet" SET balance = $1, updated_at = $2 WHERE customer_id = $3`, [newBalance, new Date(), customerId]);
        });
    }
    static checkBalance(total, balance) {
        if (total > balance) {
            return false;
        }
        return true;
    }
    static getPurchaseRecords(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`SELECT
    "Purchase".id AS purchase_id,
    "Purchase".total,
    "Purchase".createdAt,
    "Product".id AS product_id,
    "Product".name AS product_name,
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails".year
FROM
    "Purchase"
JOIN
    "PurchaseProduct" ON "Purchase".id = "PurchaseProduct".purchaseId
JOIN
    "Product" ON "PurchaseProduct".productId = "Product".id
JOIN
    "ProductDetails" on "Product".description_id = "ProductDetails".id
WHERE
    "Purchase".customerId = $1;`, [customerId]);
            return response;
        });
    }
    static getSellerCountry(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query(`SELECT
	  c.country as country
FROM
	  "Customer" c
JOIN
	  "Product" p ON c.id  = p.seller_id 
WHERE
	  p.id = $1`, [id]);
            return response.rows[0];
        });
    }
    static processPurchase(purchaseId, productData, quantity, userId, walletBalance, total) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                OrderUtils.createPurchaseProductRecord(purchaseId, productData.id, quantity),
                OrderUtils.updateProductStock(productData.id, productData.stock - quantity),
                OrderUtils.updateWalletBalance(userId, walletBalance.balance - total)
            ]);
        });
    }
    static calculateTotal(price, quantity, user, sellerCountry) {
        return (price * quantity) + this.countryTaxes(user, sellerCountry);
    }
    static countryTaxes(user, sellerCountry) {
        let tax = 0;
        const userCountry = user.country;
        if (userCountry != sellerCountry)
            tax += 1000;
        return tax;
    }
}
exports.OrderUtils = OrderUtils;
