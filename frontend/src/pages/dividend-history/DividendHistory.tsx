import { useEffect, useState } from 'react';
import { useAuthContext } from '../../auth-context/use-auth-context';
import { getAllDividends } from '../../services/dividends';
import { Dividend } from '../../types/dividend';

export const DividendHistory = () => {
  const [dividends, setDividends] = useState<Array<Dividend>>([]);
  const { authData } = useAuthContext();

  useEffect(() => {
    const fetchAllDividends = async () => {
      const { data } = await getAllDividends(authData.token);
      setDividends(data);
    };

    fetchAllDividends();
  }, []);

  return (
    <div className="h-full w-[90%] sm:w-[70%] flex flex-col mb-5">
      <table className="border-2 border-separate border-green-500">
        <thead>
          <tr>
            <th className="border-2 border-separate border-green-600 w-1/2">Amount</th>
            <th className="border-2 border-separate border-green-600 w-1/2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {dividends.length > 0 &&
            dividends.map((dividend) => (
              <tr key={dividend.id}>
                <td className="border-2 border-separate border-green-700 w-1/2 text-center">
                  {dividend.amount}
                </td>
                <td className="border-2 border-separate border-green-700 w-1/2 text-center">
                  {new Date(dividend.distributedAt).toUTCString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
