import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CompanyData } from "../../models/CompanyData";
import { CompanyState } from "../../stores/companyReducer";
import { selectCompanyData } from "../../stores/selectors";
import { CompanyCard } from "./company-card";

interface ICompanyDetailsProps {}

export const CompanyDetails = (props: ICompanyDetailsProps) => {
  const [companyDetails, setCompanyDetails] = useState<CompanyData | undefined>(
    undefined
  );

  const companyData = useSelector(selectCompanyData);

  useEffect(() => {
    setCompanyDetails(companyData);
    console.log("companyData", companyData);
  }, [companyData]);

  return (
    <>{companyDetails && <CompanyCard companyDetails={companyDetails} />}</>
  );
};
