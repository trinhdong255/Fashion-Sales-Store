import { useLoginMutation } from "@/services/api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ChangePasswordInform = () => {
  const [user, setUser] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid black",
        width: "100%",
        pt: 5,
        borderRadius: 5,
      }}
    >
      {user && (
        <>
          <Box sx={{ m: "24px 0 24px 64px" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "40px 0" }}
              spacing={17}
            >
              <Typography variant="h6">Mật khẩu hiện tại: </Typography>
              <TextField
                variant="outlined"
                label="Mật khẩu hiện tại"
                size="small"
                color="default"
                type={showCurrentPassword ? "text" : "password"}
                disabled={isLoading}
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showCurrentPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "300px" }}
              />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "40px 0" }}
              spacing={21}
            >
              <Typography variant="h6">Mật khẩu mới: </Typography>
              <TextField
                variant="outlined"
                label="Mật khẩu mới"
                size="small"
                color="default"
                type={showNewPassword ? "text" : "password"}
                disabled={isLoading}
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showNewPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "300px" }}
              />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "40px 0" }}
              spacing={10}
            >
              <Typography variant="h6">Xác nhận mật khẩu mới: </Typography>
              <TextField
                variant="outlined"
                label="Nhập lại mật khẩu mới"
                size="small"
                color="default"
                type={showConfirmPassword ? "text" : "password"}
                disabled={isLoading}
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "300px" }}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--footer-background-color)",
                marginBottom: 6,
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Lưu thay đổi
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChangePasswordInform;
