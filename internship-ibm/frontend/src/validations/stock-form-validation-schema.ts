import * as yup from "yup";

const lettersOrSpacesRegex = /^[a-zA-Z\s]+$/g;

export const stockFormValidationSchema = yup.object({
  searchPhrase: yup
    .string()
    .required("Required")
    .max(35, "Max 35 signs")
    .matches(lettersOrSpacesRegex, "Only letters and whitespaces are allowed"),
  endDate: yup.date().required("Required").nullable().default(undefined),
  startDate: yup.date().required("Required").nullable().default(undefined),
});
