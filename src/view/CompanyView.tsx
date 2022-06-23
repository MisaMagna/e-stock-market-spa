import { Box, Stack, Typography } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyAccordion from "../components/CompanyAccordion";
import { Company } from "../model/Company";
import { Stock } from "../model/Stock";
import { getCompany } from "../service/CompanyService";

interface CompanyData {
    code: string,
    name: string,
    stocks: Stock[]
}

const CompanyView: FC = () => {

    const [data, setData] = useState<CompanyData>({} as CompanyData);
    const { id } = useParams();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response: AxiosResponse<Company> = await getCompany(id as string);
                const { code, name, stocks } = response.data;
                setData({ code, name, stocks });
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error(axiosError.response?.data);
            }
        }

        fetchCompany();
    }, [id]);

    return (
        <Box>
            <Stack spacing={3}>
                <Box sx={{ my: 3 }}>
                    <Typography sx={{ fontSize: "h4.fontSize" }}>Company details</Typography>
                </Box>
                <Box>
                    {!data.code && (
                        <Typography sx={{ fontSize: "h6.fontSize" }}>
                            Company with code <strong><em>{id}</em></strong> does not exists...
                        </Typography>
                    )}
                    {data.code && <CompanyAccordion companyCode={data.code} companyName={data.name} stocks={data.stocks} />}
                </Box>
            </Stack>
        </Box>
    )
}

export default CompanyView;