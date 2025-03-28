import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import HelpIcon from "@mui/icons-material/Help";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { Link } from "react-router-dom";

const listProducts = [
  {
    name: [
      "ÁO THUN",
      "ÁO SƠ MI",
      "ÁO KHOÁC",
      "QUẦN DÀI",
      "QUẦN SHORTS",
      "PHỤ KIỆN",
    ],
  },
];

const NavMenu = () => {
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
      <BottomNavigation
        sx={{
          height: 60,
          backgroundColor: "var(--header-background-color)",
        }}
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
          label="Liên hệ"
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

      {listProducts.map((listProduct, index) => (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          key={index}
        >
          {listProduct.name.map((listProductName, index) => (
            <MenuItem
              sx={{ padding: 2 }}
              onClick={handleMenuClose}
              component={Link}
              to="/listProducts"
              key={index}
            >
              {listProductName}
            </MenuItem>
          ))}
        </Menu>
      ))}
    </>
  );
};

export default NavMenu;
