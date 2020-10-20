export interface StockSymbol {
  description: string
  displaySymbol: string
  symbol: string
  type: string
  currency: string
}

export interface StockPrice {
  date: Date
  l: number
  h: number
  o: number
  c: number
}
