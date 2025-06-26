import { Route, Routes } from "react-router-dom";

import AccountInform from "./layouts/AccountInform";
import Address from "./pages/AddressPage";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/ProfilePage";

import ScrollToTop from "@/components/ScrollToTop";
import LoginLayout from "@/layouts/LoginLayout";
import MainLayout from "@/layouts/MainLayout";
import ProductListsLayout from "@/layouts/ProductListsLayout";
import About from "@/pages/AboutPage";
import Contact from "@/pages/ContactPage";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import MyOrders from "@/pages/MyOrdersPage";
import OrderConfirmation from "@/pages/OrderConfirmationPage";
import ProductDetails from "@/pages/ProductDetailsPage";
import ProductLists from "@/pages/ProductListsPage";
import Register from "@/pages/RegisterPage";
import ShippingMethod from "@/pages/ShippingMethodPage";
import Support from "@/pages/SupportPage";
import VerifyAccount from "@/pages/VerifyAccountPage";
import ResetPassword from "./pages/ResetPasswordPage";
import ForgotPasswordVerify from "./pages/ForgotPassword/shared/ForgotPasswordVerify";
import ThemeProvider from "./context/ThemeProvider";


const App = () => {
  return (
    <ThemeProvider>
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
          <Route
            path="forgotPasswordVerify"
            element={<ForgotPasswordVerify />}
          />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Route>

        {/* Route SignUp and VerifyAccount */}
        <Route path="/register" element={<Register />} />
        <Route path="/verifyAccount" element={<VerifyAccount />} />

        {/* Route List Products */}
        <Route path="/listProducts" element={<ProductListsLayout />}>
          <Route index element={<ProductLists />} />
        </Route>

        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/shippingMethod" element={<ShippingMethod />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />

        {/* Route user */}
        <Route path="/accountInform" element={<AccountInform />}>
          <Route path="/accountInform/profile" element={<Profile />} />
          <Route
            path="/accountInform/changePassword"
            element={<ChangePassword />}
          />
          <Route path="/accountInform/address" element={<Address />} />
        </Route>

        <Route path="/myOrders" element={<MyOrders />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
