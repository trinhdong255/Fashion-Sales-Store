import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  ThemeProvider,
  useTheme,
  CircularProgress, // Thêm CircularProgress để hiển thị spinner
} from "@mui/material";
import OutlinedInput, { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

import { useLoginMutation } from "@/services/api/auth";
import { setUser } from "@/store/redux/user/reducer";

const Login = () => {
  const outerTheme = useTheme();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await login({
        username: data?.email,
        password: data?.password,
      }).unwrap();

      if (response) {
        const userData = {
          id: response.id,
          email: response.email,
          fullname: `${response.firstName} ${response.lastName}`,
          avatar: response.image,
          gender: response.gender,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };

        dispatch(setUser(userData));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
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
              onSubmit={handleSubmit(onSubmit)}
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
                    disabled={isLoading} // Vô hiệu hóa input khi đang loading
                    {...register("email", {
                      required: "Email không được để trống",
                      //TODO: Uncomment once have backend
                      // pattern: {
                      //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      //   message: "Email không hợp lệ",
                      // },
                    })}
                  />
                </ThemeProvider>
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email.message}</p>
                )}
              </Stack>

              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="password">
                  Mật khẩu
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      disabled={isLoading} // Vô hiệu hóa input khi đang loading
                      {...register("password", {
                        required: "Mật khẩu không được để trống",
                        minLength: {
                          value: 6,
                          message: "Mật khẩu phải có ít nhất 6 ký tự",
                        },
                      })}
                      endAdornment={
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
                            disabled={isLoading} // Vô hiệu hóa icon khi đang loading
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
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
                disabled={isLoading} // Vô hiệu hóa nút khi đang loading
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" /> // Hiển thị spinner khi đang loading
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
              src="/src/assets/images/backgroundFashions/background-login.jpg"
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
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
      MuiFormControl: {
        styleOverrides: {
          root: {
            "--OutlinedInput-brandBorderColor": "#E0E3E7",
            "--OutlinedInput-brandBorderHoverColor": "#B2BAC2",
            "--OutlinedInput-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--OutlinedInput-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--OutlinedInput-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--OutlinedInput-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

export default Login;
