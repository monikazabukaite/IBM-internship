import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { FormHelperText, Grid, makeStyles, Stack } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { IStockForm } from "../../models/IStockForm";
import moment from "moment";

interface IDatePickerProps
  extends Pick<UseFormReturn<IStockForm, any>, "register" | "handleSubmit"> {}

export const DatePickerRange = (props: IDatePickerProps) => {
  const { register } = props;

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const onStartDateChange = useCallback((newValue: Date | null) => {
    setStartDate(newValue);
  }, []);

  const onEndDateChange = useCallback((newValue: Date | null) => {
    setEndDate(newValue);
  }, []);

  const {
    formState: { errors },
    setValue,
  } = useFormContext<IStockForm>();

  useEffect(() => {
    if (startDate) {
      setValue("startDate", startDate);
    }
  }, [startDate, setValue]);

  useEffect(() => {
    if (endDate) {
      setValue("endDate", endDate);
    }
  }, [endDate, setValue]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid
          container
          style={{ display: "flex", alignItems: "flex-end", minHeight: "100%" }}
          columnSpacing={2}
        >
          {/* <Grid item>test</Grid> */}
          <Grid item xs={12} md={6}>
            <FormHelperText error={!!errors.searchPhase?.message}>
              {errors.startDate?.message}
            </FormHelperText>
            <DesktopDatePicker
              {...register("startDate")}
              disableFuture
              label="Date from"
              value={startDate}
              className="customDatePicker"
              minDate={new Date(moment().subtract(1, "years").toDate())}
              onChange={onStartDateChange}
              renderInput={(params) => (
                <TextField {...params} style={{ width: "100%" }} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormHelperText error={!!errors.endDate?.message}>
              {errors.endDate?.message}
            </FormHelperText>
            <DesktopDatePicker
              {...register("endDate")}
              label="Date to"
              value={endDate}
              disableFuture
              minDate={new Date(moment().subtract(1, "years").toDate())}
              onChange={onEndDateChange}
              renderInput={(params) => (
                <TextField {...params} style={{ width: "100%" }} />
              )}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};
