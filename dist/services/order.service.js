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
const order_Utils_1 = require("../utils/order.Utils");
const errors_1 = require("../errors");
class OrderService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.orderUtils = new order_Utils_1.OrderUtils(res);
    }
    createPurchase(purchaseProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.req.user;
            if (!user) {
                return this.res.status(303).json({ message: 'User not found' });
            }
            try {
                if (!this.orderUtils.checkQuantity(purchaseProduct.quantity))
                    return;
                let productData = yield this.orderUtils.getProductById(purchaseProduct.productId);
                if (!productData) {
                    return this.orderUtils.productNotFound();
                }
                if (!this.orderUtils.checkStock(productData.stock, purchaseProduct.quantity))
                    return;
                const total = productData.price * purchaseProduct.quantity;
                const walletBalance = yield this.orderUtils.getWalletById(user.id);
                if (!this.orderUtils.checkBalance(total, walletBalance))
                    return;
                const purchaseData = yield this.orderUtils.createPurchaseRecord(user.id, total);
                yield Promise.all([
                    yield this.orderUtils.createPurchaseProductRecord(purchaseData.id, productData.id, purchaseProduct.quantity),
                    yield this.orderUtils.updateProductStock(productData.id, productData.stock - purchaseProduct.quantity),
                    yield this.orderUtils.updateWalletBalance(user.id, walletBalance - total)
                ]);
                return this.res.status(202).json({
                    message: `Compra finalizada.`
                });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.OrderService = OrderService;
