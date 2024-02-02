import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PageNotFound from '../pages/PageNotFound';
import RootLayout from '../pages/Layout';
import ErrorHandler from '../components/errors/ErrorHandler';
import HomePage from '../pages';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';

const userInfo = JSON.parse(`${localStorage.getItem('userInfo')}`);
const isLoggedIn = userInfo ? true : false;
console.log(userInfo);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login" data={userInfo}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/" data={userInfo}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/login" data={userInfo}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
