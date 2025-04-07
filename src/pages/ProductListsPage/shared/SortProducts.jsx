import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import SortOptions from "./SortOptions";

const API_URL = "https://dummyjson.com/products";
const ITEMS_PER_PAGE = 20;

const SortProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

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

  const fetchData = useCallback(
    async (controller) => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await axios.get(
          `${API_URL}?limit=${ITEMS_PER_PAGE}&skip=${skip}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        let sortedData = response.data.products;
        if (sortOrder) {
          sortedData.sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
          );
        }

        setProducts(sortedData);
        setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request aborted!");
        } else {
          console.error("Fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [currentPage, sortOrder]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

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
        {loading
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
          : products.map((product) => (
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
