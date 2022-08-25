import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanyData } from '../models/CompanyData';
import { IStockForm } from '../models/IStockForm';

export interface CompanyState {
  symbol?: string;
  companyData?: CompanyData;
  searchData?: IStockForm;
}

const initialState: CompanyState = {
  symbol: undefined,
  companyData: undefined,
  searchData: undefined
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<CompanyData>) => {
        state.companyData = action.payload;
    },
    setSearchData: (state, action: PayloadAction<IStockForm>) => {
        state.searchData = action.payload;
    }
  },
})

export const { setCompany, setSearchData } = companySlice.actions

export default companySlice.reducer