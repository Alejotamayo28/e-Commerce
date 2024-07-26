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
const wallet_utils_1 = require("../utils/wallet.utils");
const errors_1 = require("../errors");
class WalletService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.walletUtils = new wallet_utils_1.WalletUtils();
    }
    createWallet(walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            if (!client) {
                return this.res.status(303).json({ message: `User not found` });
            }
            try {
                const response = yield this.walletUtils.createWalletUtils(client.id, walletData);
                return this.res.status(202).json({ Message: `Wallet crated`, Data: response });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    updateWallet(walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const client = this.req.user;
            if (!client) {
                return this.res.status(303).json({ message: `User not found` });
            }
            try {
                const walletOldData = yield this.walletUtils.getWalletRecord(client.id);
                const walletNewData = {
                    balance: (_a = walletData.balance) !== null && _a !== void 0 ? _a : walletOldData.rows[0].balance,
                    status: (_b = walletData.status) !== null && _b !== void 0 ? _b : walletOldData.rows[0].status
                };
                const Wallet = yield this.walletUtils.updateWalletRecord(client.id, walletNewData);
                return this.res.status(202).json({ Message: `Wallet Updated`, Data: Wallet.rows });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.WalletService = WalletService;
