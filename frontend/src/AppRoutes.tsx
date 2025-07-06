import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/app/Home.tsx';
import Cart from './pages/app/Cart.tsx';
import AppHeader from './Components/Header/AppHeader.tsx';
import Footer from './Components/footer/Footer.tsx';
import Login from './pages/auth/Login.tsx';
import SignUp from './pages/auth/Signup.tsx';

function AppRoutes() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideLayout && <AppHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default AppRoutes;
