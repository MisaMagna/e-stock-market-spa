import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Company } from "../model/Company";
import { Stock } from "../model/Stock";
import DatePicker from "../components/DatePicker";
import { AxiosResponse } from "axios";
import { getCompanies } from "../service/CompanyService";

const CompanyListView: FC = () => {

    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        const data = async () => {
            const response: AxiosResponse<Company[]> = await getCompanies();
            console.log(response);
            setCompanies(response.data);
        }

        data();
    }, []);

    const StockRow = (stock: Stock) => (
        <TableRow key={stock.price}>
            <TableCell>{stock.price}</TableCell>
            <TableCell>{stock.date.toString()}</TableCell>
            <TableCell>{stock.time.toString()}</TableCell>
        </TableRow>
    )

    const StocksTable = (stocks: Stock[]) => (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Stock Price</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map(StockRow)}
                </TableBody>
            </Table>
        </TableContainer>
    )

    const CompanyAccordion = (company: Company) => {
        const FIRST_PRICE = company.stocks.length ? company.stocks[0].price : 0;
        let [min, max, average]: number[] = [FIRST_PRICE, FIRST_PRICE, 0];

        for (const stock of company.stocks) {
            const price: number = stock.price;
            min = price <= min ? price : min;
            max = price >= max ? price : max;
            average += price / company.stocks.length;
        }

        return (
            <Accordion key={company.code}>
                <AccordionSummary>
                    <Typography sx={{ pr: 4 }}>{company.code}</Typography>
                    <Typography sx={{ fontStyle: "italic" }}>{company.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={3}>
                        <Stack direction={"row"}>
                            <DatePicker sx={{ mr: 4 }} />
                            <DatePicker />
                        </Stack>
                        {StocksTable(company.stocks)}
                        <Stack spacing={2} sx={{ width: "25%" }}>
                            <TextField value={min} label="Min" variant="filled" size="small" defaultValue={0} InputProps={{ readOnly: true }}></TextField>
                            <TextField value={max} label="Max" variant="filled" size="small" defaultValue={0} InputProps={{ readOnly: true }}></TextField>
                            <TextField value={average} label="Average" variant="filled" size="small" defaultValue={0} InputProps={{ readOnly: true }}></TextField>
                        </Stack>
                    </Stack>
                </AccordionDetails>
            </Accordion>)
    }

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
                    {companies.map(CompanyAccordion)}
                </Stack>
            </Stack>
        </Box>
    );
}

export default CompanyListView;