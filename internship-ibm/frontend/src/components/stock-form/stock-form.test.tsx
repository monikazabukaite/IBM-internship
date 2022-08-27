import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StockForm } from "./stock-form";
import { Provider } from "react-redux";
import { store } from "../../stores";

describe("StockForm", () => {
  it("should render form fields", async () => {
    render(
      <Provider store={store}>
        <StockForm />
      </Provider>
    );

    const symbol = screen.getByTestId("searchPhrase");
    const dateFrom = screen.getByTestId("startDate");
    const dateTo = screen.getByTestId("endDate");
    const searchButton = screen.getByText("Search");

    expect(symbol).toBeInTheDocument();
    expect(dateFrom).toBeInTheDocument();
    expect(dateTo).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
