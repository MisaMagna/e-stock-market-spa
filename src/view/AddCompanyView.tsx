import { Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react"
import { Controller, useForm } from "react-hook-form";
import { StockExchange } from "../model/StockExchange";

interface CompanyForm {
    name: string,
    CEO: string,
    turnover: string,
    website: string,
    exchange: string
}

const AddCompanyView: FC = () => {

    const { register, handleSubmit } = useForm<CompanyForm>();

    const onCompanySubmit = (data: CompanyForm) => {
        console.log(data);
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
                            <TextField {...register("name")} variant="standard" label="Company Name" />
                            <TextField {...register("CEO")} variant="standard" label="CEO Name" />
                            <TextField {...register("turnover")} variant="standard" label="Turnover (€)" />
                            <TextField {...register("website")} variant="standard" label="Website" />
                            <TextField {...register("exchange")} select variant="standard" label="Stock Exchange" defaultValue="">
                                {StockEchangeOptions}
                            </TextField>
                            <Stack direction="row" sx={{ justifyContent: "flex-end" }} >
                                <Box sx={{ mt: 4 }}>
                                    <Button>Cancel</Button>
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