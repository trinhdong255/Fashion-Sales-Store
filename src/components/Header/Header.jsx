import { useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  hexToRgb,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import HelpIcon from "@mui/icons-material/Help";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./Header.module.css";

const Header = () => {
  const listProducts = [
    {
      name: "ÁO THUN",
    },
    {
      name: "ÁO SƠ MI",
    },
    {
      name: "ÁO KHOÁC",
    },
    {
      name: "QUẦN DÀI",
    },
    {
      name: "QUẦN SHORTS",
    },
    {
      name: "PHỤ KIỆN",
    },
  ];

  const outerTheme = useTheme();
  const [value, setValue] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack className={styles.headerTop}>
        <Container maxWidth="lg">
          <Stack
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h1>FASHION STORE</h1>
            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                id="outlined-basic"
                label="Tìm kiếm sản phẩm..."
                size="small"
                variant="outlined"
                sx={{
                  width: 400,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 100,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </ThemeProvider>

            <Stack direction={"row"}>
              <IconButton
                aria-label="shopping cart"
                style={{ marginRight: 20 }}
              >
                <ShoppingCartOutlinedIcon fontSize="large" />
                <CartBadge
                  badgeContent={2}
                  color="primary"
                  overlap="circular"
                />
              </IconButton>

              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderColor: "#d9d9d9",
                    borderRadius: 5,
                    width: 125,
                    height: 40,
                    "&:hover": {
                      backgroundColor: hexToRgb("#d9d9d9"),
                    },
                  }}
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    borderRadius: 5,
                    width: 125,
                    height: 40,
                  }}
                >
                  Đăng ký
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <Stack>
        <Box sx={{ width: "100%" }}>
          <BottomNavigation
            sx={{ height: 100 }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#333", color: "white" },
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#333",
                },
                "& .MuiBottomNavigationAction-label": { pt: 0.5 },
              }}
              label="Trang chủ"
              icon={<HomeOutlinedIcon />}
              component={Link}
              to="/"
            />
            <BottomNavigationAction
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#333", color: "white" },
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#333",
                },
                "& .MuiBottomNavigationAction-label": { pt: 0.5 },
              }}
              label="Danh mục sản phẩm"
              onClick={handleMenuOpen}
              icon={<MenuIcon />}
              component={Link}
              to="/listProduct"
            />
            <BottomNavigationAction
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#333", color: "white" },
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#333",
                },
                "& .MuiBottomNavigationAction-label": { pt: 0.5 },
              }}
              label="Hỗ trợ"
              icon={<HelpIcon />}
              component={Link}
              to="/support"
            />
            <BottomNavigationAction
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#333", color: "white" },
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#333",
                },
                "& .MuiBottomNavigationAction-label": { pt: 0.5 },
              }}
              label="Liên hệ "
              icon={<ContactsIcon />}
              component={Link}
              to="/contact"
            />
            <BottomNavigationAction
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#333", color: "white" },
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#333",
                },
                "& .MuiBottomNavigationAction-label": { pt: 0.5 },
              }}
              label="Về chúng tôi"
              icon={<InfoIcon />}
              component={Link}
              to="/about"
            />
          </BottomNavigation>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {listProducts.map((listProduct, index) => (
              <MenuItem key={index} sx={{padding: 2}} onClick={handleMenuClose}>
                {listProduct.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Stack>
    </>
  );
};

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    background-color: black;
    color: white;
  }
`;

export default Header;
