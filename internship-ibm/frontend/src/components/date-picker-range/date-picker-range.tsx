import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { useCallback, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface IDatePickerProps {}

export const DatePickerRange = (props: IDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const onStartDateChange = useCallback((newValue: Date | null) => {
    setStartDate(newValue);
  }, []);

  const onEndDateChange = useCallback((newValue: Date | null) => {
    setEndDate(newValue);
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date from"
            value={startDate}
            minDate={new Date("1901-01-01")}
            onChange={onStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="Date to"
            value={endDate}
            minDate={new Date("1901-01-01")}
            onChange={onEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
};
