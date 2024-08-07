"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPositiveNumber = exports.verifyProductStock = exports.verifyProductCategory = exports.ProductCategoryEnum = void 0;
var ProductCategoryEnum;
(function (ProductCategoryEnum) {
    ProductCategoryEnum["ELECTRONICS"] = "Electronics";
    ProductCategoryEnum["FASHION"] = "Fashion";
    ProductCategoryEnum["HOME"] = "Home";
    ProductCategoryEnum["PERSONAL_CARE"] = "Personal_care";
    ProductCategoryEnum["TOYS"] = "Toys";
})(ProductCategoryEnum || (exports.ProductCategoryEnum = ProductCategoryEnum = {}));
const verifyProductCategory = (str) => {
    if (Object.values(ProductCategoryEnum).includes(str) === true)
        return true;
    else
        throw new Error(`Category must be a correct category`);
};
exports.verifyProductCategory = verifyProductCategory;
const verifyProductStock = (number) => {
    if (number > 0)
        return true;
    else
        throw new Error(`Stock must be a positive number`);
};
exports.verifyProductStock = verifyProductStock;
const verifyPositiveNumber = (number) => {
    if (number > 0)
        return true;
    else
        throw new Error(`Value must be a positive number`);
};
exports.verifyPositiveNumber = verifyPositiveNumber;
