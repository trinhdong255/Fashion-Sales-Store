import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { Outlet } from "react-router-dom";

const ProductListsLayout = () => {
  return (
    <>
      <Header />
      <WallpaperRepresentative titleHeader="Danh sách sản phẩm" />
      <Outlet />
      <Footer />
    </>
  );
};

export default ProductListsLayout;
