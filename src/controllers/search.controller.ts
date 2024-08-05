import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { errorMessage } from "../errors";
import { SearchService } from "../services/search.service";

export const getCategoryProductsController = (req: RequestExt, res: Response) => {
  try {
    new SearchService(req, res).categorySearch();
  } catch (e) {
    errorMessage(e, res);
  }
}

export const getPriceProductsController = (req: RequestExt, res: Response) => {
  try {
    new SearchService(req, res).priceSearch();
  } catch (e) {
    return errorMessage(e, res);
  }
}

export const getProductsByPriceAndCategoryController = (req: RequestExt, res: Response) => {
  try {
    new SearchService(req,res).categoryPriceSearch()
  } catch (e) {
    return errorMessage(e, res);
  }
}

