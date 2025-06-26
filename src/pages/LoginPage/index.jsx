import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
  useTheme,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useLoginMutation } from "@/services/api/auth";
import customTheme from "@/components/CustemTheme";
import { useLazyGetMyInfoQuery } from "../../services/api/auth";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/redux/user/reducer";

const Login = () => {
  const outerTheme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [triggerMyInfo, { data }] = useLazyGetMyInfoQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleShowSnackbar = (success, message = "") => {
    setSnackbar({
      open: true,
      message:
        message || (success ? "Đăng nhập thành công" : "Đăng nhập thất bại !"),
      severity: success ? "success" : "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (data) => {
    try {
      const response = await login({
        email: data?.email,
        password: data?.password,
      }).unwrap();

      if (response) {
        const role = response?.result?.roles?.[0]?.name;
        if (!role) throw new Error("Không thể xác định vai trò người dùng.");
        if (role === "ADMIN")
          throw new Error("Tài khoản ADMIN không thể đăng nhập.");

        if (role === "USER") {
          handleShowSnackbar(true, "Đăng nhập thành công!");
          setTimeout(() => navigate("/"), 1000);
        }

        localStorage.setItem("accessToken", response?.result?.accessToken);
        localStorage.setItem("refreshToken", response?.result?.refreshToken);

        await triggerMyInfo();
      }
    } catch (error) {
      const messageError =
        error?.message || error?.data?.message || "Đăng nhập thất bại !";
      handleShowSnackbar(false, messageError);
      console.log("Login failed:", error);
    }
  };

  return (
    <section>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "right", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", p: "10px 20px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "white",
            width: 800,
            height: 630,
            borderRadius: 4,
            boxShadow: "0px 4px 30px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Grid container>
            <Grid item lg={6} md={6}>
              <h2
                style={{
                  textAlign: "center",
                  margin: "46px 0 20px 0",
                  fontWeight: "inherit",
                }}
              >
                THÔNG TIN ĐĂNG NHẬP
              </h2>

              <Stack
                sx={{ padding: "0px 36px" }}
                component={"form"}
                onSubmit={handleSubmit(handleLogin)}
              >
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Stack className={styles.formLabelInput}>
                  <label className={styles.labelInput} htmlFor="email">
                    Email
                  </label>
                  <ThemeProvider theme={customTheme(outerTheme)}>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      disabled={isLoginLoading}
                      {...register("email", {
                        required: "Email không được để trống",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                  </ThemeProvider>
                  {errors.email && (
                    <p className={styles.errorMessage}>
                      {errors.email.message}
                    </p>
                  )}
                </Stack>

                <Stack className={styles.formLabelInput}>
                  <label className={styles.labelInput} htmlFor="password">
                    Mật khẩu
                  </label>
                  <ThemeProvider theme={customTheme(outerTheme)}>
                    <TextField
                      id="password"
                      label="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      disabled={isLoginLoading}
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
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                              disabled={isLoginLoading}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ThemeProvider>
                  {errors.password && (
                    <p className={styles.errorMessage}>
                      {errors.password.message}
                    </p>
                  )}
                </Stack>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 24px",
                    marginTop: "14px",
                    fontSize: "1.2rem",
                    fontWeight: "regular",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                  type="submit"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <CircularProgress size={34} color="inherit" />
                  ) : (
                    "ĐĂNG NHẬP"
                  )}
                </Button>
              </Stack>

              <Stack sx={{ display: "flex", alignItems: "center" }}>
                <Link className={styles.forgotPassword} to="forgotPassword">
                  Bạn quên mật khẩu?
                </Link>

                <span style={{ margin: "12px 0 0 0" }}>
                  Bạn chưa có tài khoản?
                  <Link className={styles.createAccount} to="/register">
                    Tạo tài khoản ngay
                  </Link>
                </span>

                <Link className={styles.backToHome} to="/">
                  Trở về trang chủ
                </Link>
              </Stack>
            </Grid>

            <Grid item lg={6} md={6}>
              <img
                style={{
                  width: "100%",
                  height: 630,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  objectFit: "cover",
                }}
                src="/src/assets/images/background-fashions/background-login.jpg"
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </section>
  );
};

export default Login;
