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
exports.getSellerCountry = exports.updateWalletBalance = exports.updateProductStock = exports.createPurchaseProductRecord = exports.processPurchase = exports.createPurchaseRecord = exports.hasSufficientBalance = exports.calculateCountryTaxes = exports.calculateTotalPrice = exports.getSellerCountryAndWalletBalance = exports.getProductById = exports.OrderUtils = void 0;
const database_1 = require("../../database/database");
const dataAccessLayer_1 = require("../dataAccessLayer");
const wallet_utils_1 = require("./wallet.utils");
class OrderUtils {
    constructor() { }
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
}
exports.OrderUtils = OrderUtils;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, dataAccessLayer_1.onSession)((client) => __awaiter(void 0, void 0, void 0, function* () {
        return yield client.query(`SELECT * FROM "Product" WHERE id = $1`, [productId]);
    }));
    return response.rows[0];
});
exports.getProductById = getProductById;
const getSellerCountryAndWalletBalance = (productId, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, dataAccessLayer_1.onSession)((client) => __awaiter(void 0, void 0, void 0, function* () {
        const [sellerCountry, walletBalance] = yield Promise.all([
            (0, exports.getSellerCountry)(productId, client),
            wallet_utils_1.WalletUtils.getWalletRecord(clientId, client)
        ]);
        return { sellerCountry, walletBalance };
    }));
});
exports.getSellerCountryAndWalletBalance = getSellerCountryAndWalletBalance;
const calculateTotalPrice = (price, quantity, user, sellerCountry) => {
    return (price * quantity) + ((0, exports.calculateCountryTaxes)(user, sellerCountry));
};
exports.calculateTotalPrice = calculateTotalPrice;
const calculateCountryTaxes = (user, sellerCountry) => {
    let tax = 0;
    const userCountry = user.country;
    if (userCountry != sellerCountry)
        tax += 1000;
    return tax;
};
exports.calculateCountryTaxes = calculateCountryTaxes;
const hasSufficientBalance = (total, balance) => {
    return total <= balance;
};
exports.hasSufficientBalance = hasSufficientBalance;
const createPurchaseRecord = (userId, total) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, dataAccessLayer_1.onTransaction)((client) => __awaiter(void 0, void 0, void 0, function* () {
        return yield client.query(`INSERT INTO "Purchase" (customerId, total) VALUES ($1, $2) RETURNING *`, [userId, total]);
    }));
    return response.rows[0];
});
exports.createPurchaseRecord = createPurchaseRecord;
const processPurchase = (purchaseId, productData, quantity, userId, walletBalance, total) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dataAccessLayer_1.onTransaction)((client) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all([
            (0, exports.createPurchaseProductRecord)(purchaseId, productData.id, quantity, client),
            (0, exports.updateProductStock)(productData.id, productData.stock - quantity, client),
            (0, exports.updateWalletBalance)(userId, walletBalance.balance - total, client)
        ]);
    }));
});
exports.processPurchase = processPurchase;
const createPurchaseProductRecord = (purchaseId, productId, quantity, client) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.query(`INSERT INTO "PurchaseProduct" (purchaseId, productId, quantity) VALUES ($1, $2, $3)`, [purchaseId, productId, quantity]);
});
exports.createPurchaseProductRecord = createPurchaseProductRecord;
const updateProductStock = (productId, newStock, client) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.query(`UPDATE "Product" SET stock = $1 WHERE id = $2`, [newStock, productId]);
});
exports.updateProductStock = updateProductStock;
const updateWalletBalance = (clientId, newBalance, client) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.query(`UPDATE "Wallet" SET balance = $1, updated_at = $2 WHERE customer_id = $3`, [newBalance, new Date(), clientId]);
});
exports.updateWalletBalance = updateWalletBalance;
const getSellerCountry = (productId, client) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.query(`SELECT
	  c.country
    FROM
	  "Customer" c
    JOIN
	  "Product" p ON c.id  = p.seller_id 
    WHERE
	  p.id = $1`, [productId]);
    return response.rows[0].country;
});
exports.getSellerCountry = getSellerCountry;
