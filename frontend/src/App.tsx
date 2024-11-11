import { Route, Routes } from 'react-router-dom';
import { Header } from './pages/components/Header';
import { Footer } from './pages/components/Footer';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Invest } from './pages/invest/Invest';
import { InvestmentHistory } from './pages/investment-history/InvestmentHistory';
import { DividendHistory } from './pages/dividend-history/DividendHistory';
import { ProtectedRoute } from './pages/components/ProtectedRoute';
import { DistrubiteDividends } from './pages/distrubite-dividends/DistrubiteDividends';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-[85vh] flex justify-center items-center">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Invest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investment-history"
            element={
              <ProtectedRoute>
                <InvestmentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dividend-history"
            element={
              <ProtectedRoute>
                <DividendHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/distribute-dividends"
            element={
              <ProtectedRoute isSuperuser={true}>
                <DistrubiteDividends />
              </ProtectedRoute>
            }
          />

          <Route path="/auth/">
            <Route
              path="login"
              element={<Login />}
            />

            <Route
              path="register"
              element={<Register />}
            />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
