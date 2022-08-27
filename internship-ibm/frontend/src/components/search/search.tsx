import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { IStockForm } from "../../models/IStockForm";
import { Box, FormHelperText } from "@mui/material";

interface ISearchProps {}

export const Search = (props: ISearchProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IStockForm>();

  return (
    <Box>
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
          "aria-label": "Provide stock ticker",
          "data-testid": "searchPhrase",
        }}
        error={!!errors.searchPhrase?.message}
      />
    </Box>
  );
};
