import { Response } from "express"; import { RequestExt } from "../models/requestExt";
import { errorMessage } from "../errors";
import { QueryResult } from "pg";
import { pool } from "../database/database";

export class SearchService {
  constructor(private req: RequestExt, private res: Response) { }
  public async categorySearch() {
    const client = this.req.user
    if (!client) {
      return this.res.status(303).json({ message: `User not found` })
    } try {
      const { filter } = this.req.params
      const response: QueryResult = await pool.query(
`SELECT 
    "Product".id as product_id,
    "Product".name,
    "Product".price,
    "Product"."stock",
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails"."year",
    "ProductDetails".category
FROM
    "ProductDetails"
JOIN
    "Product" ON "ProductDetails".id = "Product".description_id
WHERE 
    "ProductDetails".category = $1`,
        [filter])
      if (!response.rowCount) return this.res.status(303).json({ Message: 'Data not found' })
      return this.res.status(202).json({ Message: `Succesfull`, Data: response.rows })
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  
}
