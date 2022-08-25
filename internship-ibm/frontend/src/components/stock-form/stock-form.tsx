import { Button, Card, CardContent, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePickerRange } from "../date-picker-range";
import { Search } from "../search/search";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { IStockForm } from "../../models/IStockForm";
import { logUserAction } from "../../services/logging-service";
import SearchIcon from "@mui/icons-material/Search";
import { getCompanyProfile } from "../../services/stock-service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setSearchData } from "../../stores/companyReducer";
import { selectSearchData } from "../../stores/selectors";

interface IStockFormProps {}

const lettersOrSpacesRegex = /^[a-zA-Z\s]+$/g;

const validationSchema = yup.object({
  searchPhase: yup
    .string()
    .required("Required")
    .max(35, "Max 35 signs")
    .matches(lettersOrSpacesRegex, "Only letters and whitespaces are allowed"),
  endDate: yup.date(),
  // .min(yup.ref("startDate"), "End date can't be before start date"),
  // startDate: yup.date().required("Required"),
  // endDate: yup.date().nullable().required("Required"),
});

export const StockForm = (props: IStockFormProps) => {
  const methods = useForm<IStockForm>({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    mode: "all",
  });

  const { register, handleSubmit, watch, formState } = methods;

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (data: IStockForm) => {
      console.log(formState.isValid);
      if (!formState.isValid) return;

      console.log(data);
      logUserAction(data).then(({ data }) => {
        console.log("Sending completed", data);
        getCompanyProfile(data.searchPhase).then((resp) => {
          console.log("resp.data", resp.data);
          dispatch(setCompany(resp.data));
          dispatch(setSearchData(data));
        });
      });
    },
    [formState.isValid, dispatch]
  );

  return (
    <Card className="custom-card" sx={{ minWidth: "75vw" }}>
      <CardContent>
        <FormProvider {...methods}>
          <form>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Search
                  register={register}
                  handleSubmit={handleSubmit}
                  watch={watch}
                  validationError={formState.errors.searchPhase?.message}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <DatePickerRange
                  register={register}
                  handleSubmit={handleSubmit}
                />
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Button
                  variant="contained"
                  endIcon={<SearchIcon />}
                  style={{ height: "100%", minHeight: "56px" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
