import { Box, SxProps, Typography } from "@mui/material";
import { FC } from "react";
import './DatePicker.css';

interface DatePickerProps {
    sx?: SxProps;
}

const DatePicker: FC<DatePickerProps> = ({sx}) => {
    return (
        <Box sx={sx}>
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