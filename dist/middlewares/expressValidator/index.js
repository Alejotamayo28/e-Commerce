"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResult = void 0;
const express_validator_1 = require("express-validator");
const validateResult = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (err) {
        res.status(404);
        res.send(err);
    }
};
exports.validateResult = validateResult;
