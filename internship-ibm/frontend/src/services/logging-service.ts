import axios from 'axios';
import { getAbsoluteUrl } from '../helpers/url-helper';
import { IStockForm } from '../models/IStockForm';


export const logUserAction = (data: IStockForm) => {
    return axios.post(getAbsoluteUrl('log-action'), data);
}