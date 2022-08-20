import React from "react";
import "./App.css";
import { Button, Stack } from "@mui/material";
import { Search } from "./components/search";
import { DatePickerRange } from "./components/date-picker-range";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained">Hello World</Button>
        <Stack spacing={3}>
          <Search />
          <DatePickerRange />
        </Stack>
      </header>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </div>
  );
}

export default App;
