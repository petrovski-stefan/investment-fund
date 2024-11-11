import { useEffect, useState } from 'react';
import { Investment } from '../../types/investment';
import {
  deleteAllInvestments,
  deleteInvestment,
  getAllInvestments,
} from '../../services/investments';
import { useAuthContext } from '../../auth-context/use-auth-context';

export const InvestmentHistory = () => {
  const [investments, setInvestments] = useState<Array<Investment>>([]);
  const { authData } = useAuthContext();

  useEffect(() => {
    const fetchAllInvestments = async () => {
      const { data } = await getAllInvestments(authData.token);
      setInvestments(data);
    };
    fetchAllInvestments();
  }, []);

  const handleOnClick = async () => {
    const response = await deleteAllInvestments(authData.token);
    if (response.status === 204) {
      setInvestments([]);
    } else {
      console.error(response);
    }
  };

  const currentInvestedAmount = investments
    ? investments.reduce((total, curr) => total + curr.amount, 0)
    : 0;

  const handleWithdraw = async (id: string) => {
    const response = await deleteInvestment(authData.token, id);
    if (response.status === 204) {
      setInvestments((oldInvestments) =>
        oldInvestments.filter((investment) => investment.id !== id)
      );
    } else {
      console.error(response);
    }
  };

  return (
    <div className="h-full w-[90%] sm:w-[70%] flex flex-col mb-5">
      <div className="text-center font-bold">Total invested: {currentInvestedAmount}</div>
      <div className="flex justify-center my-5">
        <button
          disabled={investments.length === 0}
          onClick={handleOnClick}
          className="bg-red-600 rounded-lg py-2 px-3 font-bold border-2 border-red-600 hover:bg-white disabled:cursor-not-allowed"
        >
          Withdraw your investments
        </button>
      </div>

      <table className="border-2 border-separate border-green-500">
        <thead>
          <tr>
            <th className="border-2 border-separate border-green-600 w-1/3">Amount</th>
            <th className="border-2 border-separate border-green-600 w-1/3">Timestamp</th>
            <th className="border-2 border-separate border-green-600 w-1/3">Withdraw</th>
          </tr>
        </thead>
        <tbody>
          {investments.length > 0 &&
            investments.map((investment) => (
              <tr key={investment.id}>
                <td className="border-2 border-separate border-green-700 w-[40%] text-center">
                  {investment.amount}
                </td>
                <td className="border-2 border-separate border-green-700 w-[40%] text-center">
                  {new Date(investment.investedAt).toUTCString()}
                </td>
                <td className="border-2 border-separate border-green-700 w-[20%] text-center">
                  <button
                    onClick={() => handleWithdraw(investment.id)}
                    className="bg-red-600 rounded-lg px-5 font-bold border-2 border-red-600 hover:bg-white"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
