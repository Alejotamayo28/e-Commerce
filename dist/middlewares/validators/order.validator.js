"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderPost = void 0;
const express_validator_1 = require("express-validator");
const custom_validator_1 = require("./custom.validator");
const _1 = require(".");
exports.validateOrderPost = [
    (0, express_validator_1.check)(`productId`).exists().isNumeric().custom((value) => {
        return (0, custom_validator_1.verifyPositiveNumber)(value);
    }),
    (0, express_validator_1.check)(`quantity`).exists().isNumeric().custom((value) => {
        return (0, custom_validator_1.verifyPositiveNumber)(value);
    }),
    (req, res, next) => {
        (0, _1.validateResult)(req, res, next);
    }
];
