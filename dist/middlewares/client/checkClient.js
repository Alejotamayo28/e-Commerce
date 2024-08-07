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
exports.verifyUserExists = void 0;
const database_1 = require("../../database/database");
const errors_1 = require("../../errors");
const verifyUserExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield database_1.pool.query(`SELECT id FROM "Customer" WHERE id = $1`, [userId]);
        if (!user) {
            return res.status(404).json({ Message: `User not found` });
        }
        next();
    }
    catch (e) {
        return (0, errors_1.errorMessage)(e, res);
    }
});
exports.verifyUserExists = verifyUserExists;
