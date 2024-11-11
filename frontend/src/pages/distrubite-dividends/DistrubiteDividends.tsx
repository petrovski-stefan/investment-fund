import { useAuthContext } from '../../auth-context/use-auth-context';
import { distrubiteDividends } from '../../services/dividends';

export const DistrubiteDividends = () => {
  const { authData } = useAuthContext();

  const handleOnClick = async () => {
    const response = await distrubiteDividends(authData.token);

    if (response.status !== 201) {
      console.error(response);
    }
  };
  return (
    <div>
      <button
        onClick={handleOnClick}
        className="bg-red-600 rounded-lg px-5 py-1 font-bold border-2 border-red-600 hover:bg-white"
      >
        Distrubite dividends
      </button>
    </div>
  );
};
