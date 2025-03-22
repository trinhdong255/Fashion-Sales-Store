import {
  alpha,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Menu,
  MenuItem,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WallpaperRepresentative from "../../components/WallpaperRepresentative/WallpaperRepresentative";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./ListProducts.module.css";

const API_URL = "https://dummyjson.com/products";
const ITEMS_PER_PAGE = 20;

const sectionTitleMenuItems = [
  {
    title: "Theo mục sản phẩm",
    menuItem: [
      "Áo thun",
      "Áo sơ mi",
      "Áo khoác",
      "Quần dài",
      "Quần shorts",
      "Phụ kiện",
    ],
  },

  {
    title: "Thương hiệu",
    menuItem: ["Adidas", "Coolmate", "Puma", "Torano", "Teelab", "Cloudzy"],
  },
];

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  // Keep track of the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // Stores the total number of pages available based on the API response
  const [totalPages, setTotalPages] = useState(1);
  // Store controller to cancel request previous
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //  Using useRef to store value
  const fetchController = useRef(null);
  const [sortOrder, setSortOrder] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (order) => {
    setSortOrder(order); // Chỉ cập nhật sortOrder, không sắp xếp tại đây
    handleClose();
  };

  // Function updates the currentPage state when page is changed
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(value);
  };

  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true when starting to fetch data

    if (fetchController.current) fetchController.current.abort();
    fetchController.current = new AbortController();
    const signal = fetchController.current.signal;

    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = await fetch(
        `${API_URL}?limit=${ITEMS_PER_PAGE}&skip=${skip}`,
        { signal }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      let sortedData = data.products;
      if (sortOrder) {
        sortedData = [...sortedData].sort((a, b) => {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      }

      setProducts(sortedData);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (error) {
      if (error.name !== "AbortError") console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  }, [currentPage, sortOrder]); // Thêm sortOrder vào dependency để cập nhật khi đổi trang hoặc sắp xếp

  useEffect(() => {
    fetchData();
    return () => fetchController.current?.abort();
  }, [fetchData]); // fetchData đã có dependency là `sortOrder` và `currentPage`

  return (
    <>
      <Header />
      <WallpaperRepresentative titleHeader="Danh sách sản phẩm" />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xl={2} lg={2}>
            {sectionTitleMenuItems.map((sectionTitleMenuItem, index) => (
              <Stack sx={{ mt: 15 }} key={index}>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    width: "100%",
                    margin: 0,
                  }}
                >
                  {sectionTitleMenuItem.title}
                  <ul className={styles.navigationSelectItems}>
                    {sectionTitleMenuItem.menuItem.map((menuItem, index) => (
                      <li key={index}>
                        <Link className={styles.navigationSelectItems} to="#">
                          <p>{menuItem}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </h3>
              </Stack>
            ))}
          </Grid>
          <Grid item xl={10} lg={10}>
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
              <p
                style={{
                  color: "var(--text-color)",
                  fontSize: 18,
                }}
              >
                Sắp xếp theo
              </p>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  borderRadius: 5,
                  width: 110,
                  height: 44,
                }}
              >
                Bán chạy
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  borderColor: "#d9d9d9",
                  borderRadius: 5,
                  width: 110,
                  height: 44,
                  "&:hover": {
                    backgroundColor: alpha("#d9d9d9", 0.5),
                  },
                }}
              >
                Mới nhất
              </Button>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<ArrowForwardIosIcon fontSize="small" />}
                sx={{
                  color: "black",
                  width: "20%",
                  "&:hover": {
                    backgroundColor: alpha("#d9d9d9", 0.5),
                  },
                }}
              >
                {sortOrder === "asc"
                  ? "Giá: Tăng dần"
                  : sortOrder === "desc"
                  ? "Giá: Giảm dần"
                  : "Sắp xếp theo giá"}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleSort("asc")}>
                  Giá: Tăng dần
                </MenuItem>
                <MenuItem onClick={() => handleSort("desc")}>
                  Giá: Giảm dần
                </MenuItem>
              </Menu>
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
                      onClick={() => navigate(`/detailProducts/${product.id}`)}
                      key={product.id}
                    >
                      <Card sx={{ mt: 2 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="180"
                            image={product.thumbnail}
                            alt={product.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="div"
                            >
                              {product.title}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                            >
                              Rating: {product.rating}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body1"
                              component="div"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  textDecoration: "line-through",
                                  fontSize: "1rem",
                                }}
                              >
                                ${product.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.primary",
                                  fontSize: "1.2rem",
                                  marginLeft: "10px",
                                }}
                              >
                                ${product.price}
                              </Typography>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
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
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default ListProducts;
