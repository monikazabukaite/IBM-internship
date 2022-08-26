import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCompanyData, selectLoading } from "../../stores/selectors";
import { CompanyCard } from "./company-card";
import Skeleton from "@mui/material/Skeleton";
import { NotFound } from "../not-found";

interface ICompanyDetailsProps {}

export const CompanyDetails = (props: ICompanyDetailsProps) => {
  const companyData = useSelector(selectCompanyData);
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return (
      <Box width="75%">
        <Skeleton height={120} animation="wave" />
        <Skeleton height={80} animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    );
  }

  if (!companyData?.name) {
    return <NotFound />;
  }

  return (
    <>
      {companyData && (
        <Box sx={{ minWidth: "350px", width: "75%" }}>
          <CompanyCard companyDetails={companyData} />
        </Box>
      )}
    </>
  );
};
