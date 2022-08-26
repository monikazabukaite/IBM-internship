import * as yup from "yup";

const lettersOrSpacesRegex = /^[a-zA-Z\s]+$/g;

export const stockFormValidationSchema = yup.object({
    searchPhrase: yup
        .string()
        .required("Required")
        .max(35, "Max 35 signs")
        .matches(lettersOrSpacesRegex, "Only letters and whitespaces are allowed"),
    endDate: yup.date()
        .min(yup.ref("startDate"), "End date can't be before start date"),
    startDate: yup.date().required("Required"),
});