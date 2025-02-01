
export interface Description {
  id?:number,
  description: string,
  color: string,
  year: number,
  category: string
}
export interface Product {
  id?: number,
  name: string,
  price: number
  stock: number
  details: Description
}
//export type CreateProductInput = Omit<Product, 'id'>
//export type UpdateProductInput = Partial<Omit<Product, 'id'>>
