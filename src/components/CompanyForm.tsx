import { Alert, Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { StockExchange } from "../model/StockExchange";

export interface CompanyFormData {
    name: string,
    CEO: string,
    turnover: string,
    website: string,
    exchange: string
}

interface CompanyFormProps {
    onSubmit: (data: CompanyFormData) => void,
    showError?: boolean,
    onAlertClose?: () => void,
}

const CompanyForm: FC<CompanyFormProps> = ({ onSubmit, showError = false, onAlertClose = () => { } }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormData>();

    const StockEchangeOptions = Object
        .keys(StockExchange)
        .filter((key: string) => isNaN(Number(key)))
        .map((key: string) => <MenuItem key={key} value={key}>{key}</MenuItem>);

    return (
        <>
            {showError && (
                <Alert severity="error" onClose={onAlertClose} sx={{ mb: 2 }}>
                    An error has occurred registering the company, please try later.
                </Alert>
            )}
            <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="standard" label="Company name"
                    {...register("name", { required: { value: true, message: "Company name is required" } })}
                    error={Boolean(errors.name)} helperText={errors.name?.message}
                />
                <TextField variant="standard" label="CEO name"
                    {...register("CEO", { required: { value: true, message: "CEO name is required" } })}
                    error={Boolean(errors.CEO)} helperText={errors.CEO?.message}
                />
                <TextField type="number" variant="standard" label="Turnover (€)"
                    {...register("turnover", {
                        required: { value: true, message: "Turnover is required" },
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
                <TextField select variant="standard" label="Stock exchange" defaultValue=""
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
        </>
    )
}

export default CompanyForm;