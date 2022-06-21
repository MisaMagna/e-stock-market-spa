import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { FC, useState } from "react"
import { CompanyDetail } from "../model/CompanyDetail";
import { registerCompany } from "../service/CompanyService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CompanyForm, { CompanyFormData } from "../components/CompanyForm";


const AddCompanyView: FC = () => {

    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();

    const onCompanySubmit = (data: CompanyFormData) => {
        const fetchRegisterCompany = async () => {
            const detail: CompanyDetail = {
                name: data.name,
                CEO: data.CEO,
                turnover: Number(data.turnover),
                website: data.website,
                exchanges: [data.exchange]
            };

            try {
                await registerCompany(detail);
                navigate("/");
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error(axiosError.response?.data);
                setShowError(true);
            }
        }

        fetchRegisterCompany();
    }


    return (
        <Box>
            <Stack spacing={3}>
                <Box sx={{ my: 3 }}>
                    <Typography sx={{ fontSize: "h4.fontSize" }}>Register a new company</Typography>
                </Box>
                <Card>
                    <CardContent>
                        <CompanyForm onSubmit={onCompanySubmit} showError={showError} onAlertClose={() => setShowError(false)}></CompanyForm>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    )
}

export default AddCompanyView;