import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { CompanyDetails } from "./components/company-details";
import { StockForm } from "./components/stock-form";
import { MainPage } from "./pages";

const theme = createTheme({
  palette: {
    primary: {
      main: "#01579b",
    },
    secondary: {
      main: "#0277bd",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <MainPage />
        </header>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
