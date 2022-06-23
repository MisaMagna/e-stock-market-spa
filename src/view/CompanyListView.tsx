import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { Company } from "../model/Company";
import { AxiosResponse } from "axios";
import { getCompanies } from "../service/CompanyService";
import CompanyAccordion from "../components/CompanyAccordion";
import { useNavigate } from "react-router-dom";

const CompanyListView: FC = () => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const searchRef = useRef<HTMLInputElement>(document.createElement("input"));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            const response: AxiosResponse<Company[]> = await getCompanies();
            setCompanies(response.data);
        }

        fetchCompanies();
    }, []);


    const onCompanySearch = () => {
        const companyCode: string = searchRef.current.value;
        navigate(`/company/${companyCode}`);
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