"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWalletPut = exports.validateWalletPost = void 0;
const express_validator_1 = require("express-validator");
const _1 = require(".");
exports.validateWalletPost = [
    (0, express_validator_1.check)(`balance`).exists().isNumeric(),
    (0, express_validator_1.check)(`currency`).exists().isString(),
    (0, express_validator_1.check)(`status`).exists().isString(),
    (req, res, next) => {
        (0, _1.validateResult)(req, res, next);
    }
];
exports.validateWalletPut = [
    (0, express_validator_1.check)(`balance`).optional().isNumeric(),
    (0, express_validator_1.check)(`status`).optional().isString(),
    (req, res, next) => {
        (0, _1.validateResult)(req, res, next);
    }
];
