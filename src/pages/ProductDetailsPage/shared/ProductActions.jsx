import { Alert, alpha, Button, Skeleton, Snackbar, Stack } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setOrderData } from "@/store/redux/order/reducer";
import { useState } from "react";
import { set } from "react-hook-form";

const API_URL = "https://dummyjson.com/products";

const ProductActions = ({
  products,
  loading,
  selectedQuantity,
  selectedColor,
  selectedSize,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleBuyNow = async () => {
    if (!products) {
      setSnackbar({
        open: true,
        message: "Không có thông tin sản phẩm !",
        severity: "error",
      });
      return;
    }

    if (!selectedQuantity || selectedQuantity < 1) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn số lượng hợp lệ !",
        severity: "error",
      });
      return;
    }

    if (!selectedColor) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn màu sắc !",
        severity: "error",
      });
      return;
    }

    if (!selectedSize) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn kích thước !",
        severity: "error",
      });
      return;
    }

    // Thu thập thông tin đơn hàng
    const orderData = {
      productId: products.id,
      image: products.images,
      name: products.title || products.name,
      price: products.price,
      quantity: selectedQuantity || 1,
      color: selectedColor || "TRẮNG",
      size: selectedSize || "S",
    };

    try {
      const response = await axios.get(`${API_URL}/${products.id}`);
      const productData = response.data;

      if (productData.stock < orderData.quantity) {
        setSnackbar({
          open: true,
          message: "Sản phẩm đã hết hàng !",
          severity: "error",
        });
        return;
      }

      dispatch(setOrderData(orderData));
      navigate("/shippingMethod");
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: "Đã có lỗi xảy ra, vui lòng thử lại !",
        severity: "error",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" width={"100%"} height={30} />
      ) : products ? (
        <Stack direction={"row"} alignItems={"center"} sx={{ m: "30px 0" }}>
          <Button
            variant="outlined"
            sx={{
              p: "10px 30px",
              borderColor: "black",
              color: "black",
              "&:hover": {
                backgroundColor: alpha("#d9d9d9", 0.5),
              },
            }}
          >
            Thêm vào giỏ hàng
          </Button>

          <Button
            variant="contained"
            sx={{
              ml: 4,
              p: "10px 30px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={handleBuyNow}
          >
            Mua ngay
          </Button>
        </Stack>
      ) : null}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "right", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", p: "10px 20px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

ProductActions.propTypes = {
  products: PropTypes.object,
  loading: PropTypes.bool,
  selectedQuantity: PropTypes.number,
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
};

export default ProductActions;
