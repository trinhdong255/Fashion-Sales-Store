import Stack from "@mui/material/Stack";
import styles from "./index.module.css";
import CartButton from "./CartButton";
import HeaderSearchBar from "./SearchBar/SearchBar";
import HeaderAuthButtons from "./AuthButton";
import NavMenu from "./NavMenu";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

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

            <HeaderSearchBar />

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
