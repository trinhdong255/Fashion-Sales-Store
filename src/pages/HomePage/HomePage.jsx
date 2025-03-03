import { Card, CardMedia, Container, Grid, Stack } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import styles module css
import styles from "./HomePage.module.css";

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

const Home = () => {
  return (
    <>
      <Swiper
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
        <Grid container spacing={8}>
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
              <Link>
                <Stack className={styles.wrapperImg}>
                  <img
                    className={styles.mediaImg}
                    src={item.src}
                    alt={item.title}
                  />
                  <Stack className={styles.contentImg}>
                    <h3
                      style={{ fontSize: 32, fontWeight: 500, color: "white" }}
                    >
                      {item.title}
                    </h3>
                  </Stack>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
