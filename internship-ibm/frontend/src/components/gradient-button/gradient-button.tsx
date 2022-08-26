import { styled } from "@mui/material/styles";
import { Button, ButtonProps } from "@mui/material";
import { blue } from "@mui/material/colors";

export const GradientButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  background:
    "linear-gradient(165deg, rgba(2,0,36,1) 0%, rgba(2,119,189,1) 51%, rgba(0,212,255,1) 100%)",
  minHeight: "56px",
}));
