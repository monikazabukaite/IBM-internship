import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { IStockForm } from "../../models/IStockForm";
import { FormHelperText } from "@mui/material";

interface ISearchProps {}

export const Search = (props: ISearchProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IStockForm>();

  return (
    <>
      <FormHelperText error={!!errors.searchPhrase?.message}>
        {errors.searchPhrase?.message}
      </FormHelperText>
      <TextField
        variant="outlined"
        required
        label="Symbol"
        autoFocus
        margin="none"
        fullWidth
        {...register("searchPhrase")}
        inputProps={{
          "aria-label": "search google maps",
        }}
      />
    </>
  );
};
