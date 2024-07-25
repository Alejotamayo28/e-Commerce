export const validTables = ["Product", "Customer"]


export const validTablesFuntion = (tablename: string) => {
  if (!validTables.includes(tablename)) return new Error(`Invalid table name`)
}
