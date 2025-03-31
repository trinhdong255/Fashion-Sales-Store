import { alpha, Button, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const API_URL = "https://dummyjson.com/products";

const ProductActions = ({
  products,
  loading,
  selectedQuantity,
  selectedColor,
  selectedSize,
}) => {
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    if (!products) {
      alert("Không có thông tin sản phẩm!");
      return;
    }

    if (!selectedQuantity || selectedQuantity < 1) {
      alert("Vui lòng chọn số lượng hợp lệ!");
      return;
    }

    if (!selectedColor) {
      alert("Vui lòng chọn màu sắc!");
      return;
    }

    if (!selectedSize) {
      alert("Vui lòng chọn kích thước!");
      return;
    }

    // Thu thập thông tin đơn hàng
    const orderData = {
      productId: products.id,
      name: products.title || products.name,
      price: products.price,
      quantity: selectedQuantity || 1,
      color: selectedColor || "TRẮNG",
      size: selectedSize || "S",
    };

    try {
      // Gửi yêu cầu đến backend để kiểm tra tính hợp lệ
      const response = await axios.get(`${API_URL}/${products.id}`);
      const productData = response.data;

      // Kiểm tra số lượng tồn kho
      if (productData.stock < orderData.quantity) {
        alert("Sản phẩm đã hết hàng!");
        return;
      }

      // Lưu thông tin đơn hàng vào localStorage
      localStorage.setItem("orderData", JSON.stringify(orderData));

      // Chuyển hướng đến màn hình chọn phương thức giao hàng
      navigate("/shipping-method");
    } catch (error) {
      console.error("Error:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
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
