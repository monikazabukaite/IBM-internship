import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { useForm, UseFormReturn } from "react-hook-form";
import { IStockForm } from "../../models/IStockForm";
import { FormHelperText, Input, Stack } from "@mui/material";
import { useCallback } from "react";
import { logUserAction } from "../../services/logging-service";
import { getCompanyProfile } from "../../services/stock-service";

interface ISearchProps
  extends Pick<
    UseFormReturn<IStockForm, any>,
    "register" | "handleSubmit" | "watch"
  > {
  validationError?: string;
}

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

export const Search = (props: ISearchProps) => {
  const { register, handleSubmit, validationError } = props;

  return (
    // <Box
    //   component="form"
    //   noValidate
    //   sx={{
    //     display: "grid",
    //     gridTemplateColumns: { sm: "1fr 1fr" },
    //     gap: 2,
    //   }}
    // >
    //   <CssTextField label="Custom CSS" id="custom-css-outlined-input" />
    //   <ValidationTextField
    //     label="CSS validation style"
    //     required
    //     variant="outlined"
    //     defaultValue="Success"
    //     id="validation-outlined-input"
    //   />
    // </Box>
    <>
      {/* <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      > */}
      <FormHelperText error={!!validationError}>
        {validationError}
      </FormHelperText>
      <TextField
        // sx={{ ml: 1, flex: 1 }}
        variant="outlined"
        required
        label="Symbol"
        autoFocus
        margin="none"
        fullWidth
        {...register("searchPhase")}
        // error={!!validationError}
        // helperText={validationError}
        inputProps={{
          "aria-label": "search google maps",
        }}
      />

      {/* <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSubmit(onSubmit)}
        >
          <SearchIcon />
        </IconButton> */}
      {/* </Paper> */}
    </>
  );
};
