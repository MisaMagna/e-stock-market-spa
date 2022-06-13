import { Box, Typography } from "@mui/material";
import { FC } from "react";
import './DatePicker.css';

const DatePicker: FC = () => {
    return (
        <Box>
            <Typography 
                fontSize={12}
                fontWeight={300}
                textTransform="capitalize"
                color="#6F7E8C"
            >From</Typography>
            <input type="date" className="date-picker" />
        </Box>
    )
}

export default DatePicker;