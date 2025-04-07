import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router";
import styles from "./index.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";

const API_URL = "https://dummyjson.com/products";

const navCategories = [
  {
    title: "SẢN PHẨM BÁN CHẠY",
    description: [
      "ÁO THUN",
      "ÁO SƠ MI",
      "ÁO KHOÁC",
      "QUẦN DÀI",
      "QUẦN SHORTS",
      "PHỤ KIỆN",
    ],
    showButton: true,
  },
  {
    title: "SẢN PHẨM MỚI NHẤT",
    description: [
      "ÁO THUN",
      "ÁO SƠ MI",
      "ÁO KHOÁC",
      "QUẦN DÀI",
      "QUẦN SHORTS",
      "PHỤ KIỆN",
    ],
    showButton: true,
  },
];

const SwiperProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/listProducts");
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        });
        console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request aborted!");
        } else {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {navCategories.map((category, index) => (
        <div key={index}>
          <Stack className={styles.topSellingProducts}>
            <h3>{category.title}</h3>
            <nav className={styles.navigationTopSellingProducts}>
              <ul>
                {category.description.map((item, index) => (
                  <li key={index}>
                    <Link to="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Stack>

          <Swiper
            loop={true}
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            style={{
              margin: "50px 0",
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card onClick={() => navigate(`/productDetails/${product.id}`)}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.thumbnail}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
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
              </SwiperSlide>
            ))}
          </Swiper>

          {category.showButton && (
            <Stack alignItems={"center"}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  color: "white",
                  backgroundColor: "var(--footer-background-color)",
                  fontSize: "1rem",
                  marginBottom: "100px",
                  padding: "12px 24px",
                }}
                onClick={handleClick}
              >
                XEM THÊM
              </Button>
            </Stack>
          )}
        </div>
      ))}
    </>
  );
};

export default SwiperProducts;
