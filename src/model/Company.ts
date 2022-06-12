import { Stock } from "./Stock";
import { StockExchange } from "./StockExchange";

export interface Company {
    code: string,
    name: string,
    CEO: string,
    turnover: number,
    website: string,
    exchanges: StockExchange[]
    stocks: Stock[]
}