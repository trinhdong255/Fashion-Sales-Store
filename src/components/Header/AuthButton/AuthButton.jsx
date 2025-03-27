import { alpha, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AuthButton = () => {
  return (
    <Stack direction={"row"} spacing={2} display={"flex"} alignItems={"center"}>
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
        to="/signUp"
      >
        Đăng ký
      </Button>
    </Stack>
  );
};

export default AuthButton;
