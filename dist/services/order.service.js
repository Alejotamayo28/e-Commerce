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
const product_utils_1 = require("../utils/product.utils");
const http_response_1 = require("../utils/http.response");
const wallet_utils_1 = require("../utils/wallet.utils");
class OrderService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createPurchase(purchaseProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.req.user;
            try {
                const productData = yield (0, product_utils_1.getProductById)(purchaseProduct.productId);
                if (!productData)
                    return http_response_1.HttpResponses.sendErrorResponse(this.res, 204, `Product Not Found`);
                const [sellerCountry, walletBalance] = yield Promise.all([
                    order_Utils_1.OrderUtils.getSellerCountry(purchaseProduct.productId),
                    wallet_utils_1.WalletUtils.getWalletRecord(user.id)
                ]);
                const total = order_Utils_1.OrderUtils.calculateTotal(productData.price, purchaseProduct.quantity, user, sellerCountry.country);
                if (!order_Utils_1.OrderUtils.checkBalance(total, walletBalance.balance)) {
                    return http_response_1.HttpResponses.sendErrorResponse(this.res, 402, `Insufficient Balance`);
                }
                const purchaseData = yield order_Utils_1.OrderUtils.createPurchaseRecord(user.id, total);
                console.log(`wallet: `, walletBalance);
                yield order_Utils_1.OrderUtils.processPurchase(purchaseData.id, productData, purchaseProduct.quantity, user.id, walletBalance, total);
                return http_response_1.HttpResponses.sendSuccessResponse(this.res, `Purchase Completed Succesfully`);
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.OrderService = OrderService;
