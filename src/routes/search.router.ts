import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { searchServiceGetCategoryController } from "../controllers/search.controller";


const searchRouter = Router()
searchRouter.get(`/find/:filter`, authenticateToken, searchServiceGetCategoryController)
export default searchRouter
