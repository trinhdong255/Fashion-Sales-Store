// HeaderAuthButtons.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  alpha,
  Button,
  Avatar,
  Divider,
} from "@mui/material";

const AuthButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng
    setUser(null); // Cập nhật trạng thái user ngay lập tức
    handleMenuClose();
    navigate("/"); 
  };

  return (
    <Stack direction="row" alignItems="center">
      {user ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer" }}
          >
            <Avatar src={user.avatar} alt={user.username} />
            <Typography sx={{ marginLeft: "5px" }}>{user.username}</Typography>
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/accountInform/profile")}>
              Thông tin tài khoản
            </MenuItem>
            <MenuItem onClick={() => navigate("/myOrders")}>
              Đơn hàng của tôi
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </>
      ) : (
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
                backgroundColor: alpha("#d9d9d9", 0.5),
              },
            }}
            component={Link}
            to="/login"
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
              "&:hover": {
                backgroundColor: alpha("#333"),
              },
            }}
            component={Link}
            to="/register"
          >
            Đăng ký
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default AuthButton;
