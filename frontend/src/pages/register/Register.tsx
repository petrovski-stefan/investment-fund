import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterData } from '../../types/auth';
import { registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../auth-context/use-auth-context';

export const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    password: '',
    repeatPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const navigate = useNavigate();
  const { loginUserContext } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      registerData.username === '' &&
      registerData.password === '' &&
      registerData.repeatPassword === ''
    ) {
      setError('Please fill all fields');
      return;
    }

    try {
      setError(undefined);
      setIsLoading(true);
      const authData = await registerUser(registerData);
      loginUserContext(authData);
      if (authData.isSuperuser) {
        navigate('/distribute-dividends');
      } else {
        navigate('/');
      }
    } catch (error: unknown) {
      setError('Username already taken.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((oldValue) => ({ ...oldValue, [e.target.name]: e.target.value }));
  };

  return (
    <div className="h-full w-[80%] sm:w-[40%] md:w-[30%] lg:w-[20%]">
      <h2 className="text-center text-green-600 font-bold">Create a new account</h2>
      {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}
      {error && <h1 className="text-center text-red-600">{error}</h1>}
      <form className="flex flex-col">
        <input
          type="text"
          name="username"
          placeholder="Enter your username..."
          className="border-2 border-green-600 rounded-lg my-[5%]"
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          className="border-2 border-green-600 rounded-lg my-[5%]"
          onChange={handleOnChange}
        />

        <input
          type="password"
          name="repeatPassword"
          placeholder="Enter your password again..."
          className="border-2 border-green-600 rounded-lg my-[5%]"
          onChange={handleOnChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 w-[50%] mx-auto rounded-lg px-3 py-1 hover:bg-white border-2 border-green-600 font-bold"
        >
          Register
        </button>
      </form>
    </div>
  );
};
