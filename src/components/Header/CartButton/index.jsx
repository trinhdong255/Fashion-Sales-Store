import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Badge,
  badgeClasses,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const CartButton = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = () => {
    return (
      <Box sx={{ width: 400, overflow: "auto" }} role="presentation">
        <IconButton sx={{ mt: 4, ml: 38 }}>
          <CloseIcon onClick={toggleDrawer(false)} fontSize="large" />
        </IconButton>

        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          sx={{ m: "20px 0 20px 20px" }}
        >
          <LocalMallIcon />
          <h2 style={{ fontSize: 20 }}>GIỎ HÀNG CỦA BẠN</h2>
        </Stack>
        <Divider />
      </Box>
    );
  };

  return (
    <>
      <IconButton
        aria-label="shopping-cart"
        sx={{ mr: 4 }}
        onClick={toggleDrawer(true)}
      >
        <ShoppingCartOutlinedIcon fontSize="large" />
        <CartBadge badgeContent={2} color="primary" overlap="circular" />
      </IconButton>

      {/* Set anchor to "right" */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>
    </>
  );
};

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    background-color: black;
    color: white;
  }
`;

export default CartButton;
