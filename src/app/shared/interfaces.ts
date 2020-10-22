export interface StockSymbol {
  description: string
  displaySymbol: string
  symbol: string
  type: string
  currency: string
}

export interface StockCandles {
  c: [number]
  h: [number]
  l: [number]
  o: [number]
  s: [string]
  t: Date
  v: [number]
}
export interface ListResolution {
  subject: any
  priority: any
}
