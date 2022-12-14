import axios from "axios";
import moment from "moment";
import { getAbsoluteUrl } from "../helpers/url-helper";
import { CompanyData } from "../models/CompanyData";
import { IStockForm } from "../models/IStockForm";
import { StockCandles } from "../models/StockCandles";

export const getCompanyProfile = (symbol: string) => {
  return axios.get<CompanyData>(getAbsoluteUrl(`company-profile`), {
    params: {
      symbol,
    },
  });
};

export const getStockDetails = (data: IStockForm) => {
  return axios.get<StockCandles>(getAbsoluteUrl(`stock-details`), {
    params: {
      symbol: data.searchPhrase,
      from: moment(data.startDate).format("X"),
      to: moment(data.endDate).format("X"),
    },
  });
};
