import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Company } from "../model/Company";
import { AxiosResponse } from "axios";
import { getCompanies } from "../service/CompanyService";
import CompanyAccordion from "../components/CompanyAccordion";

const CompanyListView: FC = () => {

    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const response: AxiosResponse<Company[]> = await getCompanies();
            console.log(response);
            setCompanies(response.data);
        }

        fetchCompanies();
    }, []);

    return (
        <Box>
            <Stack spacing={3}>
                <Stack direction="row" sx={{ my: 3, justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "h4.fontSize" }}>Companies</Typography>
                    <Box>
                        <TextField type="search" size="small" label="Company id" />
                        <Button variant="contained" sx={{ ml: 3, top: 1 }}>Search</Button>
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