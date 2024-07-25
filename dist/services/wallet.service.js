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
const database_1 = require("../database/database");
class WalletService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    createWallet(walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.req.user;
            if (!client) {
                return this.res.status(303).json({ message: `User not found` });
            }
            try {
                const response = yield this.createWalletRecord(client.id, walletData);
                this.walletCreated(response);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unkown Error';
                return this.res.status(400).json({ error: errorMessage });
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
                const walletOldData = yield this.getWalletRecord(client.id);
                const walletNewData = {
                    balance: (_a = walletData.balance) !== null && _a !== void 0 ? _a : walletOldData.rows[0].balance,
                    status: (_b = walletData.status) !== null && _b !== void 0 ? _b : walletOldData.rows[0].status
                };
                const Wallet = yield this.updateWalletRecord(client.id, walletNewData);
                return this.res.status(202).json({ Message: `Wallet Updated`, Data: Wallet.rows });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unkown Error';
                return this.res.status(400).json({ error: errorMessage });
            }
        });
    }
    createWalletRecord(customerId, walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`INSERT INTO "Wallet" (customer_id, balance, currency, status) 
     VALUES ($1, $2, $3, $4) RETURNING *`, [customerId, walletData.balance, walletData.currency, walletData.status]);
            return walletResult.rows[0];
        });
    }
    walletCreated(walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.res.status(202).json({ Message: `Wallet crated`, Data: walletData });
        });
    }
    getWalletRecord(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`SELECT * FROM "Wallet" WHERE customer_id = $1`, [customerId]);
            return walletResult;
        });
    }
    updateWalletRecord(customerId, walletData) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletResult = yield database_1.pool.query(`UPDATE "Wallet" SET balance = $1, status = $2, updated_at = $3 WHERE customer_id = $4 RETURNING *`, [walletData.balance, walletData.status, new Date(), customerId]);
            return walletResult;
        });
    }
}
exports.WalletService = WalletService;
