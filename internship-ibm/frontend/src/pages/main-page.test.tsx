import React from "react";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MainPage } from "./main-page";
import { store } from "../stores";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("/company-profile", (req, res, ctx) => {
    // respond using a mocked JSON body
    if (req.url.searchParams.get("symbol") === "AAPL") {
      return res(
        ctx.json({
          country: "US",
          currency: "USD",
          exchange: "NASDAQ NMS - GLOBAL MARKET",
          name: "Apple Inc",
          ticker: "AAPL",
          ipo: "1980-12-12T00:00:00.000Z",
          marketCapitalization: 2629496.4156920463,
          shareOutstanding: 16070.8,
          logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
          phone: "14089961010.0",
          weburl: "https://www.apple.com/",
          finnhubIndustry: "Technology",
        })
      );
    } else {
      return res(ctx.json({}));
    }
  }),
  rest.post("/log-action", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn().mockReturnValue(false),
}));

describe("MainPage", () => {
  it("should render form fields", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      </Provider>
    );

    const symbol = screen.getByTestId("searchPhrase");
    const dateFrom = screen.getByTestId("startDate");
    const dateTo = screen.getByTestId("endDate");
    const searchButton = screen.getByText("Search");

    fireEvent.input(symbol, {
      target: { value: "AAPL" },
    });

    fireEvent.input(dateFrom, {
      target: { value: new Date("08/24/2022") },
    });

    fireEvent.input(dateTo, {
      target: { value: new Date("08/26/2022") },
    });

    await act(() => {
      fireEvent.click(searchButton);
    });

    expect(symbol).toBeInTheDocument();
    expect(dateFrom).toBeInTheDocument();
    expect(dateTo).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
