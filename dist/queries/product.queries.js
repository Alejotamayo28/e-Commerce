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
exports.modificarProducto = exports.createProduct = exports.getAllProducts = void 0;
const database_1 = require("../database/database");
const tables_1 = require("../database/tables");
const getAllProducts = (tablename) => __awaiter(void 0, void 0, void 0, function* () {
    if (!tables_1.validTables.includes(tablename))
        throw new Error(`Invalid table name`);
    const response = yield database_1.pool.query(`SELECT * FROM "${tablename}"`);
    return response;
});
exports.getAllProducts = getAllProducts;
const createProduct = (tablename, id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!tables_1.validTables.includes(tablename))
        throw new Error(`Invalid table name`);
    const response = yield database_1.pool.query(`INSERT INTO "${tablename}" (name,  price, stock, description, color, year, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [productData.name, productData.price, productData
            .stock, productData.description, productData.color, productData.year, id]);
    return response;
});
exports.createProduct = createProduct;
//EJEMPLO
const modificarProducto = (id, propName, propValue) => { };
exports.modificarProducto = modificarProducto;
// Product[K] ==> accede al tipo de la propiedad 
(0, exports.modificarProducto)(1, "color", "amarillo");
