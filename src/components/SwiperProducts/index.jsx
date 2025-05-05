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
import { useListProductsQuery } from "@/services/api/product";
import { useListCategoriesForUserQuery } from "@/services/api/categories";

const navCategories = [
  {
    title: "SẢN PHẨM BÁN CHẠY",
    showButton: true,
  },
  {
    title: "SẢN PHẨM MỚI NHẤT",
    showButton: true,
  },
];

const SwiperProducts = () => {
  const navigate = useNavigate();

  // Fetch products
  const { data: dataProducts } = useListProductsQuery();

  // Fetch categories, ép refetch
  const { 
    data: categories, 
    isLoading: isCategoriesLoading, 
    isError, 
    error,
    isFetching,
    refetch,
  } = useListCategoriesForUserQuery({
    refetchOnMountOrArgChange: true,
    forceRefetch: true, // Ép refetch bỏ qua cache
  });

  // Log để debug
  useEffect(() => {
    console.log("Current categories in cache:", categories);
    console.log("Is fetching:", isFetching);
  }, [categories, isFetching]);

  // Refetch thủ công khi component mount
  useEffect(() => {
    console.log("Component mounted, triggering refetch...");
    refetch();
  }, [refetch]);

  const handleClick = () => {
    navigate("/listProducts");
  };

  useEffect(() => {
    const controller = new AbortController();

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
              {isCategoriesLoading ? (
                <p>Đang tải danh mục...</p>
              ) : isError ? (
                <p>Lỗi khi tải danh mục: {error?.message || "Không thể tải dữ liệu"}</p>
              ) : (
                <ul>
                  {(categories || []).filter(item => item.status === "ACTIVE").map((item) => (
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
            {(dataProducts?.products || []).map((product) => (
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