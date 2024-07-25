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
exports.OrderService = void 0;
const database_1 = require("../database/database");
class OrderService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createPurchase(purchaseProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.req.user;
            if (!user) {
                return this.res.status(303).json({ message: 'User not found' });
            }
            try {
                if (!this.checkQuantity(purchaseProduct.quantity))
                    return;
                let productData = yield this.getProductById(purchaseProduct.productId);
                if (!productData) {
                    return this.productNotFound();
                }
                if (!this.checkStock(productData.stock, purchaseProduct.quantity))
                    return;
                const total = productData.price * purchaseProduct.quantity;
                const walletBalance = yield this.getWalletById(user.id);
                if (!this.checkBalance(total, walletBalance))
                    return;
                const purchaseData = yield this.createPurchaseRecord(user.id, total);
                yield Promise.all([
                    yield this.createPurchaseProductRecord(purchaseData.id, productData.id, purchaseProduct.quantity),
                    yield this.updateProductStock(productData.id, productData.stock - purchaseProduct.quantity),
                    yield this.updateWalletBalance(user.id, walletBalance - total)
                ]);
                return this.res.status(202).json({
                    message: `Compra finalizada.`
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                return this.res.status(400).json({ error: errorMessage });
            }
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productResult = yield database_1.pool.query(`SELECT * FROM "Product" WHERE id = $1`, [productId]);
            return productResult.rowCount > 0 ? productResult.rows[0] : null;
        });
    }
    getWalletById(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`SELECT * FROM "Wallet" WHERE customer_id = $1`, [customerId]);
            return walletResult.rows[0].balance;
        });
    }
    createPurchaseRecord(customerId, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchaseResult = yield database_1.pool.query(`INSERT INTO "Purchase" (customerId, total) VALUES ($1, $2) RETURNING *`, [customerId, total]);
            return purchaseResult.rows[0];
        });
    }
    createPurchaseProductRecord(purchaseId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query(`INSERT INTO "PurchaseProduct" (purchaseId, productId, quantity) VALUES ($1, $2, $3)`, [purchaseId, productId, quantity]);
        });
    }
    updateProductStock(productId, newStock) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query(`UPDATE "Product" SET stock = $1 WHERE id = $2`, [newStock, productId]);
        });
    }
    updateWalletBalance(customerId, newBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query(`UPDATE "Wallet" SET balance = $1, updated_at = $2 WHERE customer_id = $3`, [newBalance, new Date(), customerId]);
        });
    }
    checkQuantity(quantity) {
        if (quantity <= 0) {
            this.res.status(400).json({ message: 'La cantidad a comprar debe ser mayor a cero.' });
            return false;
        }
        return true;
    }
    checkStock(stock, quantity) {
        if (stock < quantity) {
            this.res.status(400).json({ message: 'Stock insuficiente' });
            return false;
        }
        return true;
    }
    checkBalance(total, balance) {
        if (total > balance) {
            this.res.status(400).json({ message: `insuficient balance` });
            return false;
        }
        return true;
    }
    productNotFound() {
        return this.res.status(404).json({ message: 'Producto no encontrado' });
    }
}
exports.OrderService = OrderService;
