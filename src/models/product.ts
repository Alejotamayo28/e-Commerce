export interface Product extends Desription{
  id: number,
  name: string,
  price: number
  stock: number
}

export interface Desription {
  description: string,
  color: string,
  year: number,
  category: string
}

