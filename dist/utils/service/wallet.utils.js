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
exports.WalletUtils = void 0;
const dataAccessLayer_1 = require("../dataAccessLayer");
const wallet_queries_1 = require("../../queries/wallet.queries");
class WalletUtils {
    static createWalletUtils(customerId, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, dataAccessLayer_1.onTransaction)((client) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, wallet_queries_1.queryInsertWalletRecord)(customerId, wallet, client);
            }));
        });
    }
    static getWalletRecord(customerId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (session) {
                return yield (0, wallet_queries_1.queryGetWalletRecord)(customerId, session);
            }
            else {
                return yield (0, dataAccessLayer_1.onSession)((session) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, wallet_queries_1.queryGetWalletRecord)(customerId, session);
                }));
            }
        });
    }
    static updateWalletRecord(customerId, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, dataAccessLayer_1.onTransaction)((client) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, wallet_queries_1.queryUpdateWalletRecord)(customerId, wallet, client);
            }));
        });
    }
}
exports.WalletUtils = WalletUtils;
