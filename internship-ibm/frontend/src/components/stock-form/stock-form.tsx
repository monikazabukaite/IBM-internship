import { Card, CardContent, Grid } from "@mui/material";
import { DatePickerRange } from "../date-picker-range";
import { Search } from "../search/search";
import { useForm, FormProvider } from "react-hook-form";
import { useCallback } from "react";
import { IStockForm } from "../../models/IStockForm";
import { logUserAction } from "../../services/logging-service";
import SearchIcon from "@mui/icons-material/Search";
import { getCompanyProfile } from "../../services/stock-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompany,
  setLoading,
  setSearchData,
} from "../../stores/companyReducer";
import { selectLoading } from "../../stores/selectors";
import { yupResolver } from "@hookform/resolvers/yup";
import { stockFormValidationSchema } from "../../validations";
import { GradientButton } from "../gradient-button";

interface IStockFormProps {}

export const StockForm = (props: IStockFormProps) => {
  const methods = useForm<IStockForm>({
    resolver: yupResolver(stockFormValidationSchema),
    reValidateMode: "onChange",
    mode: "all",
  });

  const { handleSubmit, formState } = methods;

  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);

  const onSubmit = useCallback(
    (data: IStockForm) => {
      console.log(formState.isValid);
      if (!formState.isValid) return;

      console.log(data);
      dispatch(setLoading(true));

      logUserAction(data).then(({ data }) => {
        console.log("Sending completed", data);
        getCompanyProfile(data.searchPhrase).then((resp) => {
          console.log("resp.data", resp.data);
          dispatch(setCompany(resp.data));
          dispatch(setSearchData(data));
          dispatch(setLoading(false));
        });
      });
    },
    [formState.isValid, dispatch]
  );

  return (
    <Card sx={{ minWidth: "75vw" }}>
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
                <Search />
              </Grid>
              <Grid item xs={12} md={7}>
                <DatePickerRange />
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <GradientButton
                  variant="contained"
                  endIcon={<SearchIcon />}
                  style={{ height: "100%" }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  Send
                </GradientButton>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
