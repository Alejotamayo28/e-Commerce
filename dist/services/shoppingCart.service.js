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
exports.ShoppingCartService = void 0;
const errors_1 = require("../errors");
const shoppingCart_utils_1 = require("../utils/service/shoppingCart.utils");
const http_response_1 = require("../utils/http.response");
class ShoppingCartService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    responseQuery(response, grand_total) {
        return this.res.status(200).json({ Message: 'Successful', Total: grand_total, Data: response });
    }
    verifyClient() {
        const client = this.req.user;
        if (!client) {
            this.res.status(401).json({ Message: `User not found` });
            return false;
        }
        return true;
    }
    addProduct(shoppingCart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield (0, shoppingCart_utils_1.getProductById)(this.req.user.id);
                if (!product.rowCount)
                    return this.sendProductNotFound();
                yield (0, shoppingCart_utils_1.postShoppingCart)(shoppingCart, this.req.user.id);
                return this.sendProductAdded();
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    getShoppingCart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.verifyClient())
                return;
            try {
                const response = yield (0, shoppingCart_utils_1.getShoppingCart)(this.req.user.id);
                return this.responseQuery(response);
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    getTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.verifyClient())
                return;
            try {
                const response = yield (0, shoppingCart_utils_1.getTotalShoppingCart)(this.req.user.id);
                return this.res.status(202).json({ Message: `Succesfull`, Total: response.rows[0].grand_total });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    sendProductNotFound() {
        return http_response_1.HttpResponses.sendErrorResponse(this.res, 204, `Product Not Found`);
    }
    sendProductAdded() {
        return http_response_1.HttpResponses.sendSuccessResponse(this.res, `Product Added To Your ShoppingCart`);
    }
}
exports.ShoppingCartService = ShoppingCartService;
