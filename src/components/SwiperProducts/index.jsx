import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./index.module.css";

import "swiper/css";
import "swiper/css/navigation";
import { useListCategoriesForUserQuery } from "@/services/api/categories";
import { useListProductsForUserQuery } from "@/services/api/product";

const navCategories = [
  { title: "SẢN PHẨM BÁN CHẠY", showButton: true },
  { title: "SẢN PHẨM MỚI NHẤT", showButton: true },
];

const SwiperProducts = () => {
  const navigate = useNavigate();

  // Fetch products
  const { data: dataProducts, isLoading: isProductsLoading } = useListProductsForUserQuery({
    refetchOnMountOrArgChange: true,
    forceRefetch: true,
  });

  // Fetch categories with explicit page and size
  const { data: dataCategories, isLoading: isCategoriesLoading, isError, error } = useListCategoriesForUserQuery({
    page: 0,
    size: 10, // Match the API response size
    refetchOnMountOrArgChange: true,
    forceRefetch: true,
  });
  console.log("dataCategories", dataCategories);

  const handleClick = () => {
    navigate("/listProducts");
  };

  // Ensure activeCategories is an array from the transformed data
  const activeCategories = Array.isArray(dataCategories) ? dataCategories.filter(item => item.status === "ACTIVE") : [];

  return (
    <>
      {navCategories.map((category, index) => (
        <div key={index}>
          <Stack className={styles.topSellingProducts}>
            <h3>{category.title}</h3>
            <nav className={styles.navigationTopSellingProducts}>
              {isCategoriesLoading ? (
                <p>Đang tải danh mục...</p>
              ) : isError ? (
                <p>Lỗi khi tải danh mục: {error?.message || "Không thể tải dữ liệu"}</p>
              ) : (
                <ul>
                  {activeCategories.map((item) => (
                    <li key={item.id}>
                      <Link to="#">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </Stack>

          <Swiper
            loop={true}
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            style={{ "--swiper-navigation-color": "#f5f5f5", minHeight: 500, marginBottom: "20px" }}
          >
            {isProductsLoading ? (
              <SwiperSlide>
                <Typography>Đang tải sản phẩm...</Typography>
              </SwiperSlide>
            ) : (
              (dataProducts?.items || []).map((product) => (
                <SwiperSlide key={product.id}>
                  <Card onClick={() => navigate(`/productDetails/${product.id}`)}>
                    <CardActionArea sx={{ minHeight: "100%" }}>
                      <CardMedia
                        component="img"
                        height="300"
                        width="100%"
                        image={product.images?.[0]?.imageUrl}
                        alt={product.name}
                        loading="lazy"
                      />
                      <CardContent sx={{ minHeight: "100%" }}>
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {product.name}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                          Đã bán: {product.soldQuantity || 0}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "text.primary", fontSize: "1.2rem" }}
                          >
                            {product.price?.toLocaleString("vi-VN")} VNĐ
                          </Typography>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {category.showButton && (
            <Stack alignItems={"center"}>
              <Button
                variant="contained"
                size="large"
                sx={{
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