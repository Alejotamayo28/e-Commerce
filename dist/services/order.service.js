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
const errors_1 = require("../errors");
const http_response_1 = require("../utils/http.response");
const order_Utils_1 = require("../utils/service/order.Utils");
class OrderService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createPurchase(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.req.user;
            try {
                const productData = yield (0, order_Utils_1.getProductById)(product.productId);
                if (!productData)
                    return this.sendProductNotFoundError();
                const { sellerCountry, walletBalance } = yield (0, order_Utils_1.getSellerCountryAndWalletBalance)(product.productId, user.id);
                const total = (0, order_Utils_1.calculateTotalPrice)(productData.price, product.quantity, user, sellerCountry);
                if (!(0, order_Utils_1.hasSufficientBalance)(total, walletBalance.balance)) {
                    return this.sendInsufficientBalanceError();
                }
                const purchaseData = yield (0, order_Utils_1.createPurchaseRecord)(user.id, total);
                yield (0, order_Utils_1.processPurchase)(purchaseData.id, productData, product.quantity, user.id, walletBalance, total);
                return this.sendPurchaseSuccessResponse();
            }
            catch (e) {
                return this.handleError(e);
            }
        });
    }
    sendProductNotFoundError() {
        return http_response_1.HttpResponses.sendErrorResponse(this.res, 204, `Product Not Found`);
    }
    sendInsufficientBalanceError() {
        return http_response_1.HttpResponses.sendErrorResponse(this.res, 402, `Insufficient Balance`);
    }
    sendPurchaseSuccessResponse() {
        return http_response_1.HttpResponses.sendSuccessResponse(this.res, `Purchase Completed Successfully`);
    }
    handleError(e) {
        return (0, errors_1.errorMessage)(e, this.res);
    }
}
exports.OrderService = OrderService;
