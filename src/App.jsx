import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import Contact from "./pages/ContactPage/ContactPage";
import { Container } from "@mui/material";
import ListProductsPage from "./pages/ListProductsPage/ListProductsPage";
import Support from "./pages/SupportPage/SupportPage";
import About from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listProduct" element={<ListProductsPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
