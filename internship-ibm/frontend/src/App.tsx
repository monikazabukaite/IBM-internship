import { ThemeProvider } from "@mui/material/styles";
import { MainPage } from "./pages";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { theme } from "./theme";

const StyledAppContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
}));

const Header = styled("header")(({ theme }) => ({
  backgroundColor: grey[50],
  minHeight: "calc(100vh - 20px)",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white",
}));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledAppContainer>
        <Header>
          <MainPage />
        </Header>
      </StyledAppContainer>
    </ThemeProvider>
  );
};

export default App;
