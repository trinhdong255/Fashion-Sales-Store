// ProductLists.jsx
import { Container, Grid, Stack, CircularProgress, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import SortProducts from "./shared/SortProducts";

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

const ProductLists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // Đọc query parameter từ URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchTerm(search);
  }, [location.search]);

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Stack
          sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Đang tải sản phẩm...</Typography>
        </Stack>
      ) : (
        <Grid container>
          <Grid item xl={2} lg={2}>
            {sectionTitleMenuItems.map((sectionTitleMenuItem, index) => (
              <Stack sx={{ mt: "38px" }} key={index}>
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
            <SortProducts
              searchTerm={searchTerm}
              onLoadingChange={handleLoadingChange}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductLists;