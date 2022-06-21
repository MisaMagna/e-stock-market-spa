
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { Stock } from "../model/Stock";
import { StockPrice } from "../model/StockPrice";
import { addStock, getCompanyStockByDateRange } from "../service/StockService";

interface CompanyAccordionProps {
    companyCode: string,
    companyName: string,
    stocks: Stock[];
}

interface Metrics {
    min: number,
    max: number,
    average: number
}

const CompanyAccordion: FC<CompanyAccordionProps> = ({ companyCode, companyName, stocks }) => {

    const defaultDate = new Date().toISOString().slice(0, 10);

    const [currentStocks, setCurrentStocks] = useState<Stock[]>(stocks);
    const [metrics, setMetrics] = useState<Metrics>({ min: 0, max: 0, average: 0 });

    const startDateRef = useRef<HTMLInputElement>(document.createElement("input"));
    const endDateRef = useRef<HTMLInputElement>(document.createElement("input"));
    const stockPriceRef = useRef<HTMLInputElement>(document.createElement("input"));

    useEffect(() => {
        const FIRST_PRICE = currentStocks.length ? currentStocks[0].price : 0;
        let [min, max, average]: number[] = [FIRST_PRICE, FIRST_PRICE, 0];

        for (const stock of currentStocks) {
            const price: number = stock.price;
            min = price <= min ? price : min;
            max = price >= max ? price : max;
            average += price / currentStocks.length;
        }

        setMetrics({ min, max, average });
    }, [stocks, currentStocks])


    const onDateChange = (companyCode: string) => {
        const fetchStocks = async () => {
            const startDate: string = startDateRef.current.value;
            const endDate: string = endDateRef.current.value;
            const response: AxiosResponse<Stock[]> = await getCompanyStockByDateRange(companyCode, startDate, endDate);
            setCurrentStocks(response.data);
        }

        fetchStocks();
    }

    const onAddCompanyStock = (companyCode: string) => {
        const fetchAddCompanyStock = async () => {
            const price: StockPrice = {
                price: Number(stockPriceRef.current.value)
            };
            stockPriceRef.current.value = "";
            await addStock(companyCode, price);
            onDateChange(companyCode);
        }

        fetchAddCompanyStock();
    }

    const StockRow = (stock: Stock) => (
        <TableRow key={`${stock.price}-${stock.date}-${stock.time}`}>
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

    return (
        <Accordion>
            <AccordionSummary>
                <Typography sx={{ pr: 4 }}>{companyCode}</Typography>
                <Typography sx={{ fontStyle: "italic" }}>{companyName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={3}>
                    <Box>
                        <TextField inputRef={startDateRef} type="date" size="small" label="From" defaultValue={defaultDate} sx={{ mr: 4 }} />
                        <TextField inputRef={endDateRef} type="date" size="small" label="To" defaultValue={defaultDate} sx={{ mr: 4 }} />
                        <Button variant="contained" onClick={() => onDateChange(companyCode)}>Search</Button>
                    </Box>
                    {StocksTable(currentStocks)}
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Stack spacing={2} sx={{ width: "25%" }}>
                            <TextField value={metrics.min} label="Min" variant="filled" size="small" InputProps={{ readOnly: true }} />
                            <TextField value={metrics.max} label="Max" variant="filled" size="small" InputProps={{ readOnly: true }} />
                            <TextField value={metrics.average} label="Average" variant="filled" size="small" InputProps={{ readOnly: true }} />
                        </Stack>
                        <Box>
                            <TextField inputRef={stockPriceRef} type="number" size="small" label="Company stock price" sx={{ mr: 3 }}></TextField>
                            <Button variant="contained" onClick={() => onAddCompanyStock(companyCode)} sx={{ top: 1 }}>Add</Button>
                        </Box>
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default CompanyAccordion;