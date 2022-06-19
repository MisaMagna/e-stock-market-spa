import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react"
import { StockExchange } from "../model/StockExchange";

const AddCompanyView: FC = () => {

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
                        <Stack spacing={2}>
                            <TextField variant="standard" label="Company Name" />
                            <TextField variant="standard" label="CEO Name" />
                            <TextField variant="standard" label="Turnover ($)" />
                            <TextField variant="standard" label="Website" />
                            <FormControl variant="standard" >
                                <InputLabel id="stock-exchange-label">Stock Exchange</InputLabel>
                                <Select labelId="stock-exchange-label" label="Stock Exchange" >
                                    {StockEchangeOptions}
                                </Select>
                            </FormControl>
                            <Stack direction="row" sx={{ justifyContent: "flex-end" }} >
                                <Box sx={{ mt: 4 }}>
                                    <Button>Cancel</Button>
                                    <Button variant="contained" sx={{ ml: 4 }}>Confirm</Button>
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