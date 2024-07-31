"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductPost = void 0;
const express_validator_1 = require("express-validator");
const _1 = require(".");
exports.validateProductPost = [
    (0, express_validator_1.check)(`name`).exists().isString(),
    (0, express_validator_1.check)(`price`).exists().isNumeric(),
    (0, express_validator_1.check)(`stock`).exists().isNumeric().custom((value, {}) => {
        if (value <= 0)
            throw new Error(`Stock out of range`);
        return true;
    }),
    (0, express_validator_1.check)(`description`).exists().isString(),
    (0, express_validator_1.check)(`color`).exists().isString(),
    (0, express_validator_1.check)(`year`).exists().isNumeric(),
    (req, res, next) => {
        (0, _1.validateResult)(req, res, next);
    }
];
