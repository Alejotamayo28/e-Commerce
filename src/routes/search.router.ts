import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { getCategoryProductsController, getPriceProductsController, getProductsByPriceAndCategoryController } from "../controllers/search.controller";


const searchRouter = Router()
searchRouter.get(`/find/category/:category`, authenticateToken,getCategoryProductsController )
searchRouter.get(`/find/price/:price`, authenticateToken, getPriceProductsController)
searchRouter.get(`/find/categoryprice/:category/:price/`, authenticateToken, getProductsByPriceAndCategoryController)
export default searchRouter
