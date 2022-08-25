import { Stack } from "@mui/material";
import { CompanyDetails } from "../components/company-details";
import { StockForm } from "../components/stock-form";

export const MainPage = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <StockForm />
      <CompanyDetails />
    </Stack>
  );
};
