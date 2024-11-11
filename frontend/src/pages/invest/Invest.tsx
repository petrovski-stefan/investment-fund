import { ChangeEvent, FormEvent, useState } from 'react';
import { makeNewInvestment } from '../../services/investments';
import { useAuthContext } from '../../auth-context/use-auth-context';

export const Invest = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { authData } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (investmentAmount === undefined) {
      setError('Please set an amount.');
      return;
    }

    if (investmentAmount <= 0) {
      setError('Please set a positive amount.');
      return;
    }

    try {
      setError(undefined);
      setIsLoading(true);

      const { data } = await makeNewInvestment(authData.token, investmentAmount);
      // TODO:
      setInvestmentAmount(0);
      console.log(data);
    } catch (error: unknown) {
      setError('Error. Try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(Number(e.target.value));
  };

  // Input field bug (ex. 05000, for 5000)
  const amountInputValue = investmentAmount ? (investmentAmount === 0 ? '' : investmentAmount) : '';

  return (
    <div className="h-full w-[80%] sm:w-[40%] md:w-[30%] lg:w-[20%]">
      <h1 className="text-center text-green-600 font-bold">Invest in the fund</h1>
      {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}
      {error && <h1 className="text-center text-red-600">{error}</h1>}
      <form className="flex flex-col">
        <input
          type="number"
          value={amountInputValue}
          name="amount"
          placeholder="Enter amount..."
          className="border-2 border-green-600 rounded-lg my-[5%]"
          onChange={handleOnChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 w-[50%] mx-auto rounded-lg px-3 py-1 hover:bg-white border-2 border-green-600 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
