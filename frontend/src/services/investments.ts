import { Investment } from '../types/investment';
import axiosInstance from './axios-instance';

const ALL_INVESTMENTS_URL = '/investments/';

export const getAllInvestments = async (token: string) => {
  const res = await axiosInstance.get<Array<Investment>>(ALL_INVESTMENTS_URL, {
    headers: { Authorization: `Token ${token}` },
  });

  return res;
};

export const makeNewInvestment = async (token: string, amount: number) => {
  const res = await axiosInstance.post(
    ALL_INVESTMENTS_URL,
    { amount: amount },
    { headers: { Authorization: `Token ${token}` } }
  );

  return res;
};

export const deleteInvestment = async (token: string, investmentId: string) => {
  const res = await axiosInstance.delete(`${ALL_INVESTMENTS_URL}${investmentId}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res;
};

export const deleteAllInvestments = async (token: string) => {
  const res = await axiosInstance.delete(ALL_INVESTMENTS_URL, {
    headers: { Authorization: `Token ${token}` },
  });

  return res;
};
