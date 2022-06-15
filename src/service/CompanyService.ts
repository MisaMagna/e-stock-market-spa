import axios from "axios";
import { Company } from "../model/Company";
import { CompanyDetail } from "../model/CompanyDetail";

const API = process.env.REACT_APP_COMPANY_API;


export const getCompanies = () => {
    return axios.get<Company[]>(`${API}/get-all`);
}

export const getCompany = (id: string) => {
    return axios.get<Company>(`${API}/info/${id}`);
}

export const registerCompany = (companyDetail: CompanyDetail) => {
    return axios.post<Company>(`${API}/register`, companyDetail);
}

export const deleteCompany = (id: string) => {
    return axios.delete<void>(`${API}/delete/${id}`);
}