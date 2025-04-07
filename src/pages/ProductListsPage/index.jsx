import { Container, Grid, Stack } from "@mui/material";

import styles from "./index.module.css";
import { Link } from "react-router-dom";
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
  return (
    <Container maxWidth="lg">
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
          <SortProducts />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductLists;
