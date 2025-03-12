import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import Contact from "./pages/ContactPage/ContactPage";
import Support from "./pages/SupportPage/SupportPage";
import About from "./pages/AboutPage/AboutPage";
import Login from "./pages/LoginPage/LoginPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MainLayout from "./layouts/MainLayout/MainLayout";
import LoginLayout from "./layouts/LoginLayout/LoginLayout";

function App() {
  return (
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

      {/* Route not dependencies component Header and Footer */}
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
