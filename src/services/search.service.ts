import { Response } from 'express'
import { RequestExt } from '../models/requestExt'
import { QueryResult } from 'pg'
import { errorMessage } from '../errors'
import { verifyClient } from '../utils/jwt'
import { getProductsByCategory, getProductsByCategoryAndPrice, getProductsByPrice } from '../utils/search.utils'

export class SearchService {
  constructor(private req: RequestExt, private res: Response) { }
  private responseQuery(response: QueryResult): Response {
    if (!response.rowCount) {
      return this.res.status(400).json({ Message: 'Data not found' })
    }
    return this.res.status(200).json({ Message: 'Successful', Data: response.rows })
  }
  private async verifyAndExecute(queryFunction: () => Promise<QueryResult>): Promise<Response> {
    const client = this.req.user
    if (!verifyClient(client)) {
      return this.res.status(401).json({ Message: 'Unauthorized' })
    }
    try {
      const response: QueryResult = await queryFunction()
      return this.responseQuery(response)
    } catch (e) {
      return errorMessage(e, this.res)
    }
  }
  public async categorySearch(): Promise<Response> {
    return this.verifyAndExecute(async () => {
      const { category } = this.req.params
      return await getProductsByCategory(category)
    })
  }
  public async priceSearch(): Promise<Response> {
    return this.verifyAndExecute(async () => {
      const { price } = this.req.params
      return await getProductsByPrice(Number(price))
    })
  }
  public async categoryPriceSearch(): Promise<Response> {
    return this.verifyAndExecute(async () => {
      const { category, price } = this.req.params
      return await getProductsByCategoryAndPrice(category, Number(price))
    })
  }
}

