import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import HeaderAuthButtons from "./AuthButton";
import CartButton from "./CartButton";
import styles from "./index.module.css";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";


const Header = () => {
  return (
    <div className={styles.stickyHeader}>
      <Stack className={styles.headerTop}>
        <Container maxWidth="lg">
          <Stack
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              FASHION STORE
            </Link>

            <SearchBar />

            <Stack direction={"row"}>
              <CartButton />
              <HeaderAuthButtons />
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <NavMenu />
    </div>
  );
};

export default Header;
