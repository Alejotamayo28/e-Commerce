"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthLogin = void 0;
const express_validator_1 = require("express-validator");
const _1 = require(".");
exports.validateAuthLogin = [
    (0, express_validator_1.check)(`email`).exists().isEmail(),
    (0, express_validator_1.check)(`password`).exists().isString(),
    (req, res, next) => {
        (0, _1.validateResult)(req, res, next);
    }
];
