import { Response } from "express";
import { RequestExt } from "../models/requestExt";
import { errorMessage } from "../errors";
import { SearchService } from "../services/search.service";

export const searchServiceGetCategoryController = (req: RequestExt, res: Response) => {
  try {
    new SearchService(req,res).categorySearch()
  } catch (e) {
    errorMessage(e, res)
  }
}
