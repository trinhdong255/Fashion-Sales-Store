import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { Fragment } from "react";

const ProductListsLayout = () => {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main>
        <WallpaperRepresentative titleHeader="Danh sách sản phẩm" />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default ProductListsLayout;
