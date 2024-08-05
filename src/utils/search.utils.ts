import { QueryResult } from "pg";
import { pool } from "../database/database";

export const getProductsByCategory = async (category: String): Promise<QueryResult> => {
  return await pool.query(
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
}

export const getProductsByPrice = async (price: number): Promise<QueryResult> => {
  return await pool.query(
    `SELECT 
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
}

export const getProductsByCategoryAndPrice = async (category: string, price: number): Promise<QueryResult> => {
  return await pool.query(
    `
    SELECT 
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
}
