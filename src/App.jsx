import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Contact from "./pages/ContactPage/Contact";
import Support from "./pages/SupportPage/Support";
import About from "./pages/AboutPage/About";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MainLayout from "./layouts/MainLayout/MainLayout";
import LoginLayout from "./layouts/LoginLayout/LoginLayout";
import ListProductsLayout from "./layouts/ListProductsLayout/ListProductsLayout";
import ListProducts from "./pages/ListProductsPage/ListProducts";
import VerifyAccount from "./pages/VerifyAccountPage/VerifyAccount";
import DetailProducts from "./pages/DetailProductsPage/DetailProducts";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Route dependencies component Header and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="support" element={<Support />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Route Login */}
        <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>

        {/* Route SignUp and VerifyAccount */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verifyAccount" element={<VerifyAccount />} />

        {/* Route List Products */}
        <Route path="/listProducts" element={<ListProductsLayout />}>
          <Route index element={<ListProducts />} />
        </Route>

        <Route path="/detailProducts/:id" element={<DetailProducts />} />
      </Routes>
    </>
  );
}

export default App;
