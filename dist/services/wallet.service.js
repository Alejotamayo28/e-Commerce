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
exports.WalletService = void 0;
const errors_1 = require("../errors");
const http_response_1 = require("../utils/http.response");
const wallet_utils_1 = require("../utils/service/wallet.utils");
const wallet_queries_1 = require("../queries/wallet.queries");
class WalletService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createWallet(walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.req.user;
            try {
                yield wallet_utils_1.WalletUtils.createWalletUtils(user.id, walletData);
                return this.sendWalletCreatedRespons();
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    updateWallet(walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.req.user;
            try {
                const newWallet = yield (0, wallet_queries_1.UpdateWalletFields)(user.id, walletData);
                yield wallet_utils_1.WalletUtils.updateWalletRecord(user.id, newWallet);
                return this.sendWalletUpdatedResponse();
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    sendWalletCreatedRespons() {
        return http_response_1.HttpResponses.sendSuccessResponse(this.res, `Wallet Created Succesfully`);
    }
    sendWalletUpdatedResponse() {
        return http_response_1.HttpResponses.sendSuccessResponse(this.res, `Wallet Created Succesfully`);
    }
}
exports.WalletService = WalletService;
