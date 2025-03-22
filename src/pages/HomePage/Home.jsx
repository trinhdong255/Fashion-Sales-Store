import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import styles module css
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

const slides = [
  "/src/assets/images/backgroundFashions/backgroundHomePage.jpg",
  "/src/assets/images/backgroundFashions/backgroundHomePage-1.jpg",
  "/src/assets/images/backgroundFashions/backgroundHomePage-2.jpg",
  "/src/assets/images/backgroundFashions/backgroundHomePage-3.jpg",
];

const categories = [
  { src: "/src/assets/images/categories/T-shirt.jpg", title: "ÁO THUN" },
  { src: "/src/assets/images/categories/Shirt.jpg", title: "ÁO SƠ MI" },
  { src: "/src/assets/images/categories/Jacket.jpg", title: "ÁO KHOÁC" },
  { src: "/src/assets/images/categories/Trouser.jpg", title: "QUẦN DÀI" },
  { src: "/src/assets/images/categories/Shorts.jpg", title: "QUẦN SHORTS" },
  { src: "/src/assets/images/categories/Accessories.jpg", title: "PHỤ KIỆN" },
];

const API_URL = "https://dummyjson.com/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use AbortController to cancel request if component is unmounted.
    // If you call API and component is unmounted before fetch is complete, error may occur "memory leak"
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request aborted!");
        } else {
          console.error("Fetch error:", error.message);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, []);

  const handleClick = () => {
    navigate("/listProducts");
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: "100%", height: "94vh" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
              }}
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Container maxWidth="lg">
        <Grid container spacing={12}>
          {categories.map((item, index) => (
            <Grid
              sx={{
                marginTop: 6,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              item
              xl={4}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              key={index}
            >
              <Link to="/listProducts">
                <Stack className={styles.wrapperImg}>
                  <img
                    className={styles.mediaImg}
                    src={item.src}
                    alt={item.title}
                  />
                  <Stack className={styles.contentImg}>
                    <h2
                      style={{ fontSize: 32, fontWeight: 500, color: "white" }}
                    >
                      {item.title}
                    </h2>
                  </Stack>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Stack className={styles.topSellingProducts}>
          <h3>SẢN PHẨM BÁN CHẠY</h3>
          <nav className={styles.navigationTopSellingProducts}>
            <ul>
              {categories.map((item, index) => (
                <li key={index}>
                  <Link to="#">{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </Stack>

        <Swiper
          loop={slides.length > 3}
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
              <Card onClick={() => navigate(`/detailProducts/${product.id}`)}>
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

        <Stack className={styles.topSellingProducts}>
          <h3>SẢN PHẨM MỚI NHẤT</h3>
          <nav className={styles.navigationTopSellingProducts}>
            <ul>
              {categories.map((item, index) => (
                <li key={index}>
                  <Link to="#">{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </Stack>

        <Swiper
          loop={slides.length > 3}
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
              <Card onClick={() => navigate(`/detailProducts/${product.id}`)}>
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
      </Container>
    </>
  );
};

export default Home;
