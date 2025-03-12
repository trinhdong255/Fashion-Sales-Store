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
} from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useForm } from "react-hook-form";

const Login = () => {
  const outerTheme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Xử lý hiển thị mật khẩu
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log("Dữ liệu form:", data);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#DEF0FF",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="email">
                  Email
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
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
              >
                ĐĂNG NHẬP
              </Button>
            </Stack>

            <Stack sx={{ display: "flex", alignItems: "center" }}>
              <Link className={styles.forgotPassword} to="forgotPassword">
                Bạn quên mật khẩu?
              </Link>

              <span style={{ margin: "12px 0 0 0" }}>
                Bạn chưa có tài khoản?
                <Link className={styles.createAccount} to="/signUp">
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
