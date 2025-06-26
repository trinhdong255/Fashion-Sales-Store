import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Container, Stack, Typography } from "@mui/material";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Order from "@/pages/ShippingMethodPage/shared/Order";
import { Fragment } from "react";

const ShippingMethod = () => {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg">
          <Stack alignItems={"center"} sx={{ m: "80px 0" }}>
            <Stack direction={"row"} alignItems={"center"}>
              <LocalShippingIcon fontSize="large" />
              <Typography variant="h5" sx={{ ml: 2 }}>
                CHỌN HÌNH THỨC GIAO HÀNG
              </Typography>
            </Stack>

            <Order />
          </Stack>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default ShippingMethod;
