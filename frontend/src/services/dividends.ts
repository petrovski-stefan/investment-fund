import { Dividend } from '../types/dividend';
import axiosInstance from './axios-instance';

const ALL_DIVIDENDS_URL = '/dividends/';

export const getAllDividends = async (token: string) => {
  const res = await axiosInstance.get<Array<Dividend>>(ALL_DIVIDENDS_URL, {
    headers: { Authorization: `Token ${token}` },
  });

  return res;
};

export const distrubiteDividends = async (token: string) => {
  const res = await axiosInstance.post(
    ALL_DIVIDENDS_URL,
    {},
    {
      headers: { Authorization: `Token ${token}` },
    }
  );

  return res;
};
