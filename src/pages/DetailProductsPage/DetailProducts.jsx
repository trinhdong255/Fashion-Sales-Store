import {
  alpha,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://dummyjson.com/products";

const buttonOptionSizes = ["S", "M", "L", "XL"];

const DetailProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSelectColor = (color) => {
    setColors(color);
  };

  const handleSelectSize = (size) => {
    setSizes(size);
  };

  useEffect(() => {
    console.log("Fetching product...");
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProduct = async () => {
      setLoading(true); // Set loading khi bắt đầu fetch API
      try {
        const response = await fetch(`${API_URL}/${id}`, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Product data:", data);
        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error.message);
        }
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Stack sx={{ m: "80px 0" }}>
          <Grid container spacing={4}>
            <Grid item xl={6} lg={6}>
              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={400} />
              ) : products ? (
                <img src={products.images} alt={products.title} width="80%" />
              ) : null}
            </Grid>

            <Grid item xl={6} lg={6}>
              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Typography variant="h4">{products.title}</Typography>
              ) : null}

              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ m: "30px 0" }}
              >
                {loading ? (
                  <Skeleton variant="rectangular" width={"100%"} height={30} />
                ) : products ? (
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography variant="h6">Giá: </Typography>
                    <Typography variant="h5" sx={{ ml: 1 }}>
                      {products.price ? `$${products.price}` : ""}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        textDecoration: "line-through",
                        fontSize: "1rem",
                        ml: 2,
                      }}
                    >
                      {products.price ? `$${products.price}` : ""}
                    </Typography>

                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {products.minimumOrderQuantity
                        ? `Đã bán: ${products.minimumOrderQuantity}`
                        : ""}
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ m: "30px 0" }}
                >
                  <Typography variant="h6">MSP: </Typography>
                  <Typography variant="h5" sx={{ ml: 1 }}>
                    {products.sku ? `${products.sku}` : ""}
                  </Typography>
                </Stack>
              ) : null}

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography variant="h6">Loại: </Typography>
                  <Typography variant="h5" sx={{ ml: 1 }}>
                    {products.tags ? `${products.tags}` : ""}
                  </Typography>
                </Stack>
              ) : null}

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ m: "30px 0" }}
                >
                  <Typography variant="h6">Thương hiệu: </Typography>
                  <Typography variant="h5" sx={{ ml: 1 }}>
                    {products.brand ? `${products.brand}` : ""}
                  </Typography>
                </Stack>
              ) : null}

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ m: "30px 0" }}
                >
                  <Button
                    sx={{
                      borderColor: "black",
                      color: colors === "Trắng" ? "white" : "black",
                      backgroundColor: colors === "Trắng" ? "black" : "white",
                    }}
                    variant="outlined"
                    onClick={() => handleSelectColor("Trắng")}
                  >
                    Trắng
                  </Button>
                  <Button
                    sx={{
                      ml: 2,
                      borderColor: "black",
                      color: colors === "Đen" ? "white" : "black",
                      backgroundColor: colors === "Đen" ? "black" : "white",
                    }}
                    variant="outlined"
                    onClick={() => handleSelectColor("Đen")}
                  >
                    Đen
                  </Button>
                </Stack>
              ) : null}

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ m: "30px 0" }}
                >
                  <Typography variant="h6">Số lượng:</Typography>
                  <Stack direction={"row"} sx={{ ml: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleDecreaseQuantity}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          backgroundColor: alpha("#d9d9d9", 0.5),
                        },
                      }}
                    >
                      -
                    </Button>
                    <Typography
                      variant="h6"
                      sx={{
                        minWidth: "40px",
                        textAlign: "center",
                      }}
                    >
                      {quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleIncreaseQuantity}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          backgroundColor: alpha("#d9d9d9", 0.5),
                        },
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Stack>
              ) : null}

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ m: "30px 0" }}
                >
                  <Typography variant="h6">Size: </Typography>
                  {buttonOptionSizes.map((buttonOptionSize, index) => (
                    <Button
                      sx={{
                        ml: 2,
                        borderColor: "black",
                        color: sizes === buttonOptionSize ? "white" : "black",
                        backgroundColor:
                          sizes === buttonOptionSize ? "black" : "white",
                      }}
                      variant="outlined"
                      onClick={() => handleSelectSize(buttonOptionSize)}
                      key={index}
                    >
                      {buttonOptionSize}
                    </Button>
                  ))}
                </Stack>
              ) : null}

              {loading ? (
                <Skeleton variant="rectangular" width={"100%"} height={30} />
              ) : products ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ m: "30px 0" }}
                >
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
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <Footer />)
    </>
  );
};

export default DetailProducts;
