"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validTablesFuntion = exports.validTables = void 0;
exports.validTables = ["Product", "Customer"];
const validTablesFuntion = (tablename) => {
    if (!exports.validTables.includes(tablename))
        return new Error(`Invalid table name`);
};
exports.validTablesFuntion = validTablesFuntion;
