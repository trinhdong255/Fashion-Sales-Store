import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
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

  // Fetch products with refetch capability
  const {
    data: dataProducts,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useListProductsForUserQuery({
    refetchOnMountOrArgChange: true,
    forceRefetch: true,
  });
  console.log("dataProducts", dataProducts);

  // Fetch categories with explicit page and size
  const {
    data: dataCategories,
    isLoading: isCategoriesLoading,
    isError,
    error,
  } = useListCategoriesForUserQuery({
    page: 0,
    size: 10,
    refetchOnMountOrArgChange: true,
    forceRefetch: true,
  });
  console.log("dataCategories", dataCategories);

  const handleClick = () => {
    navigate("/listProducts");
  };

  // Adjust activeProducts to handle the API response structure
  const activeProducts = Array.isArray(dataProducts?.result?.items)
    ? dataProducts.result.items.filter((item) => item.status === "ACTIVE")
    : [];

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
                <p>
                  Lỗi khi tải danh mục:{" "}
                  {error?.message || "Không thể tải dữ liệu"}
                </p>
              ) : (
                <ul>
                  {dataCategories
                    ?.filter((item) => item.status === "ACTIVE")
                    ?.map((item) => (
                      <li key={item.id}>
                        <Link to="#">{item.name}</Link>
                      </li>
                    ))}
                </ul>
              )}
            </nav>
          </Stack>

          <Swiper
            loop={false}
            slidesPerView={5}
            slidesPerGroup={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            style={{
              "--swiper-navigation-color": "white",
              minHeight: 500,
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
            }}
          >
            {isProductsLoading ? (
              <SwiperSlide>
                <p>Đang tải sản phẩm...</p>
              </SwiperSlide>
            ) : activeProducts.length === 0 ? (
              <SwiperSlide>
                <p>Không có sản phẩm để hiển thị</p>
              </SwiperSlide>
            ) : (
              activeProducts.map((product) => {
                const variantPrice =
                  product.variants && product.variants.length > 0
                    ? product.variants[0].price
                    : 0;

                return (
                  <SwiperSlide key={product.id}>
                    <Card
                      onClick={() => navigate(`/productDetails/${product.id}`)}
                    >
                      <CardActionArea sx={{ minHeight: "100%" }}>
                        <CardMedia
                          component="img"
                          height="300"
                          width="100%"
                          image={
                            product.variants && product.variants.length > 0
                              ? product.variants[0].imageUrl
                              : ""
                          }
                          alt={product.name}
                          loading="lazy"
                          sx={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        <CardContent sx={{ minHeight: "100%" }}>
                          <h3
                            style={{
                              fontWeight: 400,
                              textAlign: "center",
                              lineHeight: "1.6rem",
                            }}
                          >
                            {product.name}
                          </h3>
                          <p
                            style={{
                              marginTop: 12,
                              fontSize: "1.2rem",
                              color: "var(--text-color)",
                            }}
                          >
                            {variantPrice?.toLocaleString("vi-VN")}đ
                          </p>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </SwiperSlide>
                );
              })
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