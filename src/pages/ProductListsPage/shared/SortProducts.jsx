import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import SortOptions from "./SortOptions";

import { useListProductsQuery } from "@/services/api/product";

const ITEMS_PER_PAGE = 20;

const SortProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Tính skip dựa trên currentPage
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Gọi API với RTK Query
  const { data, isLoading } = useListProductsQuery({
    skip,
    limit: ITEMS_PER_PAGE,
  });

  // Lấy danh sách sản phẩm và tổng số trang từ data
  const products = data?.products || [];
  const totalPages = data?.total ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  // Sắp xếp sản phẩm ở client-side nếu có sortOrder
  const sortedProducts = sortOrder
    ? [...products].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      )
    : products;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    handleClose();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(value);
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        sx={{
          backgroundColor: "#f9f9f9",
          width: "100%",
          height: 108,
        }}
      >
        <SortOptions
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleSort={handleSort}
          open={open}
          sortOrder={sortOrder}
          setAnchorEl={setAnchorEl}
          handleClick={handleClick}
        />
      </Stack>

      <Grid container spacing={2} columns={10}>
        {isLoading
          ? Array.from(new Array(ITEMS_PER_PAGE)).map((_, index) => (
              <Grid item xl={2} lg={2} key={index}>
                <Card sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : sortedProducts.map((product) => (
              <Grid
                item
                xl={2}
                lg={2}
                onClick={() => navigate(`/productDetails/${product.id}`)}
                key={product.id}
              >
                <ProductCard product={product} />
              </Grid>
            ))}

        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          sx={{ width: "100%", m: 10 }}
        >
          <Pagination
            size="large"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
          />
        </Stack>
      </Grid>
    </>
  );
};

export default SortProducts;
