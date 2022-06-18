import axios from "axios";
import { Stock } from "../model/Stock";
import { StockPrice } from "../model/StockPrice";

const API = process.env.REACT_APP_STOCK_API;

export const getCompanyStockByDateRange = (companyId: string, startDate: string, endDate: string) => {
    return axios.get<Stock[]>(`${API}/get/${companyId}/${startDate}/${endDate}`);
}

export const addStock = (companyId: string, price: StockPrice) => {
    return axios.post<void>(`${API}/add/${companyId}}`, price);
}