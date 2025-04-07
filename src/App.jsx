import { Route, Routes } from "react-router-dom";
import Home from "@/pages/HomePage";
import Contact from "@/pages/ContactPage";
import Support from "@/pages/SupportPage";
import About from "@/pages/AboutPage";
import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";
import ForgotPassword from "@/pages/ForgotPassword";
import MainLayout from "@/layouts/MainLayout";
import LoginLayout from "@/layouts/LoginLayout";
import VerifyAccount from "@/pages/VerifyAccountPage";
import ProductDetails from "@/pages/ProductDetailsPage";
import ScrollToTop from "@/components/ScrollToTop";
import ProductListsLayout from "@/layouts/ProductListsLayout";
import ProductLists from "@/pages/ProductListsPage";
import ShippingMethod from "@/pages/ShippingMethodPage";
import OrderConfirmation from "@/pages/OrderConfirmationPage";
import MyOrders from "@/pages/MyOrdersPage";
import Profile from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import Address from "./pages/AddressPage";
import AccountInform from "./layouts/AccountInform";

const App = () => {
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
    </>
  );
};

export default App;
