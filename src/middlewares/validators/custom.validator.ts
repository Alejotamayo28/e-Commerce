export enum ProductCategoryEnum {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion",
  HOME = "Home",
  PERSONAL_CARE = "Personal_care",
  TOYS = "Toys"
}
export const verifyProductCategory = (str: string) => {
  if (Object.values(ProductCategoryEnum).includes(str as ProductCategoryEnum) === true) return true
  else throw new Error(`Category must be a correct category`)
}
export const verifyProductStock = (number: number) => {
  if (number > 0) return true
  else throw new Error(`Stock must be a positive number`)
}
