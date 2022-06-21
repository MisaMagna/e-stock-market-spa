import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { Company } from "../model/Company";
import { AxiosError, AxiosResponse } from "axios";
import { getCompanies, getCompany } from "../service/CompanyService";
import CompanyAccordion from "../components/CompanyAccordion";

const CompanyListView: FC = () => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const searchRef = useRef<HTMLInputElement>(document.createElement("input"));

    useEffect(() => {
        const fetchCompanies = async () => {
            const response: AxiosResponse<Company[]> = await getCompanies();
            setCompanies(response.data);
        }

        fetchCompanies();
    }, []);


    const onCompanySearch = () => {
        const fetchCompany = async () => {
            const companyCode: string = searchRef.current.value;
            try {
                const response: AxiosResponse<Company> = await getCompany(companyCode);
                setCompanies([response.data]);
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error(axiosError.response?.data);
            }
        }

        fetchCompany();
    }

    return (
        <Box>
            <Stack spacing={3}>
                <Stack direction="row" sx={{ my: 3, justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "h4.fontSize" }}>Companies</Typography>
                    <Box>
                        <TextField inputRef={searchRef} type="search" size="small" label="Company id" sx={{ mr: 3 }} />
                        <Button variant="contained" onClick={onCompanySearch} sx={{ top: 1 }}>Search</Button>
                    </Box>
                </Stack>
                <Stack spacing={2}>
                    {companies.map((company) => <CompanyAccordion key={company.code} companyCode={company.code} companyName={company.name} stocks={company.stocks} />)}
                </Stack>
            </Stack>
        </Box>
    );
}

export default CompanyListView;