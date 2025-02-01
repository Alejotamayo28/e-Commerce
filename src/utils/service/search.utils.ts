import { PoolClient, QueryResult } from "pg";
import { onSession } from "../dataAccessLayer";

export const getProductsByCategory = async (category: String): Promise<QueryResult> => {
  const response: QueryResult = await onSession(async (client: PoolClient) => {
    return await client.query(
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
      [category]
    );
  })
  return response
}

export const getProductsByPrice = async (price: number): Promise<QueryResult> => {
  const response: QueryResult = await onSession(async (client: PoolClient) => {
    return await client.query(`SELECT 
    "ProductDetails".id,
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails"."year",
    "ProductDetails".category,
    "Product".name,
    "Product".price,
    "Product".stock
FROM
    "ProductDetails"
JOIN
    "Product" ON "ProductDetails".id = "Product".description_id
WHERE 
	"Product".price <= $1`,
      [price]
    );
  })
  return response
}

export const getProductsByCategoryAndPrice = async (category: string, price: number): Promise<QueryResult> => {
  const response: QueryResult = await onSession(async (client: PoolClient) => {
    return await client.query(`SELECT 
    "ProductDetails".id,
    "ProductDetails".description,
    "ProductDetails".color,
    "ProductDetails"."year",
    "ProductDetails".category,
    "Product".name,
    "Product".price,
    "Product".stock
FROM
    "ProductDetails"
JOIN
    "Product" ON "ProductDetails".id = "Product".description_id
WHERE 
	"Product".price <= $1 AND "ProductDetails".category = $2`,
      [price, category])
  })
  return response
}
