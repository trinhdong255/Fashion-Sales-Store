import { alpha, Button, Skeleton, Stack } from "@mui/material";
import PropTypes from "prop-types";

const ProductActions = ({ products, loading }) => {
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
};

export default ProductActions;
