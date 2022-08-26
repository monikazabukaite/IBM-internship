import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./store";

const selectSelf = (state: RootState) => state

export const selectCompanyData = createSelector(selectSelf, (state) => state.company.companyData);

export const selectSearchData = createSelector(selectSelf, (state) => state.company.searchData);

export const selectLoading = createSelector(selectSelf, (state) => state.company.isLoading);