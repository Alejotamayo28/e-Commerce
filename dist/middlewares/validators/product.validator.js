"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductPost = void 0;
const express_validator_1 = require("express-validator");
const _1 = require(".");
const custom_validator_1 = require("./custom.validator");
exports.validateProductPost = [
    (0, express_validator_1.check)(`name`).exists().isString(),
    (0, express_validator_1.check)(`price`).exists().isNumeric(),
    (0, express_validator_1.check)(`stock`).exists().isNumeric().custom((value) => {
        (0, custom_validator_1.verifyProductStock)(value);
    }),
    (0, express_validator_1.check)(`description`).exists().isString(),
    (0, express_validator_1.check)(`color`).exists().isString(),
    (0, express_validator_1.check)(`year`).exists().isNumeric(),
    (0, express_validator_1.check)(`category`).exists().isString().custom((value) => {
        return (0, custom_validator_1.verifyProductCategory)(value);
    }),
    (req, res, next) => {
        (0, _1.validateResult)(req, res, next);
    }
];
