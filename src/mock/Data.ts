import { Company } from "../model/Company";
import { StockExchange } from "../model/StockExchange";

export const COMPANY_DATA: Company[] = [
    {
        code: "asdqwe",
        name: "Company 1",
        CEO: "CEO 1",
        turnover: 150,
        website: "example.com",
        exchanges: [StockExchange.NSE],
        stocks: [
            { price: 1000, date: new Date(), time: new Date() },
            { price: 3000, date: new Date(), time: new Date() },
            { price: 5000, date: new Date(), time: new Date() }
        ]
    },
    {
        code: "qweasd",
        name: "Company 2",
        CEO: "CEO 2",
        turnover: 10,
        website: "example.com",
        exchanges: [StockExchange.NSE],
        stocks: [
            { price: 1000, date: new Date(), time: new Date() },
            { price: 2000, date: new Date(), time: new Date() },

        ]
    },
    {
        code: "zxcasd",
        name: "Company 3",
        CEO: "CEO 3",
        turnover: 10,
        website: "example.com",
        exchanges: [StockExchange.NSE],
        stocks: [
            { price: 4000, date: new Date(), time: new Date() },
            { price: 8000, date: new Date(), time: new Date() },
            { price: 3000, date: new Date(), time: new Date() },
            { price: 1000, date: new Date(), time: new Date() }
        ]
    },
    {
        code: "asdzxc",
        name: "Company 4",
        CEO: "CEO 4",
        turnover: 10,
        website: "example.com",
        exchanges: [StockExchange.NSE],
        stocks: [
            { price: 6000, date: new Date(), time: new Date() }
        ]
    }
];