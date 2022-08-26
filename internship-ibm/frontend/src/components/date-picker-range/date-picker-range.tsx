import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { FormHelperText, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useFormContext } from "react-hook-form";
import { IStockForm } from "../../models/IStockForm";
import moment from "moment";

interface IDatePickerProps {}

export const DatePickerRange = (props: IDatePickerProps) => {
  const {
    formState: { errors },
    setValue,
    watch,
    register,
  } = useFormContext<IStockForm>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onStartDateChange = useCallback(
    (newValue: Date | null) => {
      if (newValue) {
        setValue("startDate", newValue);
      }
    },
    [setValue]
  );

  const onEndDateChange = useCallback(
    (newValue: Date | null) => {
      if (newValue) {
        setValue("endDate", newValue);
      }
    },
    [setValue]
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid
          container
          style={{ display: "flex", alignItems: "flex-end", minHeight: "100%" }}
          columnSpacing={2}
        >
          <Grid item xs={12} md={6}>
            <FormHelperText error={!!errors.searchPhrase?.message}>
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
