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
import VerifyAccount from "./pages/VerifyAccountPage/VerifyAccount";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductListsLayout from "./layouts/ProductListsLayout/ProductListsLayout";
import ProductLists from "./pages/ProductListsPage/ProductLists";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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

          <Route path="/listProducts" element={<ProductListsLayout />}>
            <Route index element={<ProductLists />} />
          </Route>

          <Route path="/productDetails/:id" element={<ProductDetails />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
