"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const errorMessage = (error, res) => {
    const errorMessage = error instanceof Error ? error.message : `Unkwon Error`;
    console.error(errorMessage);
    return res.status(404).json({ message: errorMessage });
};
exports.errorMessage = errorMessage;
