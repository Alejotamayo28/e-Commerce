import { PoolClient, QueryResult } from "pg"
import { Product, Description } from "../../models/product"

export class ProductUtils {
  static async getProducts(client: PoolClient): Promise<QueryResult<Product>> {
    const response: QueryResult = await client.query<Product>(
      `SELECT * FROM "Product"`)
    return response
  }
  static async getProductById(client: PoolClient, id:number): Promise<Product> {
const response: QueryResult = await client.query<Product>(
    `SELECT * FROM "Product" WHERE id = $1`,
      [id])
    return response.rows[0]
  }
  static async insertProductDetails(client: PoolClient, data: Description): Promise<Description> {
    const query = `
      INSERT INTO "ProductDetails" (description, color, year, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [data.description, data.color, data.year, data.category];
    const { rows: [productDetails] } = await client.query<Description>(query, values);
    return productDetails;
  }
  static async insertProduct(client: PoolClient, data: Product, descriptionId: number, sellerId: number): Promise<Omit<Product, 'details'>> {
    const query = `
      INSERT INTO "Product" (name, price, stock, description_id, seller_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [data.name, data.price, data.stock, descriptionId, sellerId];
    const { rows: [product] } = await client.query<Omit<Product, 'details'>>(query, values);
    return product
  }
  static constructProductResponse(product: Omit<Product, 'details'>, details: Description): Product {
    return {
      name: product.name,
      price: product.price,
      stock: product.stock,
      details: {
        description: details.description,
        color: details.color,
        year: details.year,
        category: details.category
      }
    }
  }
}




