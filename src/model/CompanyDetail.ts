import { StockExchange } from "./StockExchange";

export interface CompanyDetail {
    name: string,
    CEO: string,
    turnover: number,
    website: string,
    exchanges: StockExchange[]
}