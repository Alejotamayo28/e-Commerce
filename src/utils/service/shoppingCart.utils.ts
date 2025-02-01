import { QueryResult } from "pg";
import { pool } from "../../database/database";
import { ShoppingCart } from "../../models/shoppingCart";


export const postShoppingCart = async (shoppingCart: ShoppingCart, id: number): Promise<ShoppingCart> => {
  const response: QueryResult = await pool.query(
    `INSERT INTO "ShoppingCart" (customerId, productId, quantity, added_at) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, shoppingCart.productId, shoppingCart.quantity, new Date()]
  )
  return response.rows[0]
}

export const getShoppingCart = async (id: number): Promise<ShoppingCart> => {
  const response: QueryResult = await pool.query(
    `    SELECT
        p.name,
        p.price,
        sc.quantity,
        p.stock,
        pd.description,
        pd.color,
        pd.year,
        pd.category,
        (sc.quantity * p.price) AS total
    FROM 
        "ShoppingCart" sc 
    JOIN
        "Product" p ON sc.productid = p.id 
    JOIN 
        "ProductDetails" pd ON p.description_id = pd.id 
    WHERE 
        sc.customerid = $1`,
    [id]
  )
  return response.rows[0]
}

export const getProductById = async (id: number): Promise<QueryResult> => {
  const response: QueryResult = await pool.query(
    `SELECT * FROM "Product" WHERE id = $1`,
    [id])
  return response
}

export const getTotalShoppingCart = async (id: number): Promise<QueryResult> => {
  const response: QueryResult = await pool.query(
    `	WITH ShoppingCartWithTotal AS (
    SELECT
        p.name,
        p.price,
        sc.quantity,
        p.stock,
        pd.description,
        pd.color,
        pd.year,
        pd.category,
        (sc.quantity * p.price) AS total
    FROM 
        "ShoppingCart" sc 
    JOIN
        "Product" p ON sc.productid = p.id 
    JOIN 
        "ProductDetails" pd ON p.description_id = pd.id 
    WHERE 
        sc.customerid = $1
)
SELECT (SELECT SUM(total) FROM ShoppingCartWithTotal) AS grand_total
FROM ShoppingCartWithTotal;`,
    [id])
  return response
}

