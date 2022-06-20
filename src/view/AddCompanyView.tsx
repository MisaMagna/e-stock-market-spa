import { Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react"
import { CompanyDetail } from "../model/CompanyDetail";
import { useForm } from "react-hook-form";
import { StockExchange } from "../model/StockExchange";
import { registerCompany } from "../service/CompanyService";
import { AxiosError } from "axios";
import { Link, useNavigate, useRoutes } from "react-router-dom";

interface CompanyForm {
    name: string,
    CEO: string,
    turnover: string,
    website: string,
    exchange: string
}

const AddCompanyView: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<CompanyForm>();
    const navigate = useNavigate();

    const onCompanySubmit = (data: CompanyForm) => {
        console.log(data);
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
                // TODO: show component with the message
            }
        }

        fetchRegisterCompany();
    }

    const StockEchangeOptions = Object
        .keys(StockExchange)
        .filter((key: string) => isNaN(Number(key)))
        .map((key: string) => <MenuItem key={key} value={key}>{key}</MenuItem>);

    return (
        <Box>
            <Stack spacing={3}>
                <Box sx={{ my: 3 }}>
                    <Typography sx={{ fontSize: "h4.fontSize" }}>Register a new company</Typography>
                </Box>
                <Card>
                    <CardContent>
                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onCompanySubmit)}>
                            <TextField variant="standard" label="Company Name"
                                {...register("name", { required: { value: true, message: "Company name is required" } })}
                                error={Boolean(errors.name)} helperText={errors.name?.message}
                            />
                            <TextField variant="standard" label="CEO Name"
                                {...register("CEO", { required: { value: true, message: "CEO name is required" } })}
                                error={Boolean(errors.CEO)} helperText={errors.CEO?.message}
                            />
                            <TextField variant="standard" label="Turnover (€)"
                                {...register("turnover", {
                                    required: { value: true, message: "Turnover is required" },
                                    pattern: { value: /^[0-9]*$/, message: "Turnover must be numeric" },
                                    min: { value: 10000000, message: "Turnover must be greater than 10.000.000" }
                                })}
                                error={Boolean(errors.turnover)} helperText={errors.turnover?.message}
                            />
                            <TextField variant="standard" label="Website"
                                {...register("website", {
                                    required: { value: true, message: "Website is required" },
                                    pattern: { value: /^(https?:\/\/)?[a-z0-9.-]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, message: "Website must be valid" }
                                })}
                                error={Boolean(errors.website)} helperText={errors.website?.message}
                            />
                            <TextField select variant="standard" label="Stock Exchange" defaultValue=""
                                {...register("exchange", { required: { value: true, message: "Stock exchange is required" } })}
                                error={Boolean(errors.exchange)} helperText={errors.exchange?.message}
                            >
                                {StockEchangeOptions}
                            </TextField>
                            <Stack direction="row" sx={{ justifyContent: "flex-end" }} >
                                <Box sx={{ mt: 4 }}>
                                    <Button component={Link} to="/">Cancel</Button>
                                    <Button type="submit" variant="contained" sx={{ ml: 4 }}>Confirm</Button>
                                </Box>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    )
}

export default AddCompanyView;