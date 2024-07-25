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
exports.walletServicePutController = exports.wallerServicePostController = void 0;
const wallet_service_1 = require("../services/wallet.service");
const wallerServicePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new wallet_service_1.WalletService(req, res).createWallet(req.body);
    }
    catch (e) {
        console.error(e);
    }
});
exports.wallerServicePostController = wallerServicePostController;
const walletServicePutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new wallet_service_1.WalletService(req, res).updateWallet(req.body);
    }
    catch (e) {
        console.error(e);
    }
});
exports.walletServicePutController = walletServicePutController;
