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
import OutlinedInput, {
  outlinedInputClasses,
} from "@mui/material/OutlinedInput";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./SignUpPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const outerTheme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
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

  const startOtpCountdown = () => {
    setOtpTimer(30);
    setIsResendDisabled(true);

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#DEF0FF",
        height: "120vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "white",
          width: 1000,
          height: 880,
          borderRadius: 4,
          boxShadow: "0px 4px 30px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Grid container>
          <Grid item lg={6} md={6}>
            <h2
              style={{
                textAlign: "center",
                margin: "24px 0 10px 0",
                fontWeight: "inherit",
              }}
            >
              TẠO TÀI KHOẢN
            </h2>
            <Stack
              sx={{ padding: "0px 36px" }}
              component={"form"}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="fullName">
                  Họ và tên
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="fullName"
                    label="Họ và tên"
                    variant="outlined"
                    {...register("fullName", {
                      required: "Họ và tên không được để trống",
                      pattern: {
                        value: /^[A-Za-zÀ-Ỹà-ỹ0-9]+$/, // Chỉ cho phép chữ cái và số, không có khoảng trắng
                        message:
                          "Chỉ được sử dụng chữ cái và số, không có khoảng trắng hoặc ký tự đặc biệt",
                      },
                    })}
                  />
                  {errors.fullName && (
                    <p className={styles.errorMessage}>
                      {errors.fullName.message}
                    </p>
                  )}
                </ThemeProvider>
              </Stack>

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
                  {errors.email && (
                    <p className={styles.errorMessage}>
                      {errors.email.message}
                    </p>
                  )}
                </ThemeProvider>
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

              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="verifyOTP">
                  Xác thực OTP
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="verifyOTP"
                    label="Xác thực OTP"
                    variant="outlined"
                    {...register("verifyOTP", {
                      required: "OTP không được để trống",
                      minLength: {
                        value: 6,
                        message: "OTP phải có ít nhất 6 ký tự",
                      },
                    })}
                  />
                  {errors.verifyOTP && (
                    <p className={styles.errorMessage}>
                      {errors.verifyOTP.message}
                    </p>
                  )}
                </ThemeProvider>
                <Button
                  variant="contained"
                  onClick={startOtpCountdown}
                  disabled={isResendDisabled}
                  sx={{
                    width: "max-content",
                    mt: "14px",
                    backgroundColor: "black",
                  }}
                >
                  {isResendDisabled
                    ? `Gửi lại OTP (${otpTimer}s)`
                    : "Gửi lại OTP"}
                </Button>
              </Stack>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "4px 24px",
                  marginTop: "20px",
                  fontSize: "1.2rem",
                  fontWeight: "regular",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                type="submit"
              >
                ĐĂNG KÝ
              </Button>
            </Stack>

            <Stack sx={{ display: "flex", alignItems: "center" }}>
              <div style={{ margin: "34px 0" }}>
                <span>
                  Bạn đã có tài khoản?
                  <Link className={styles.linkFooter} to="/login">
                    Đăng nhập
                  </Link>
                </span>
              </div>
            </Stack>
          </Grid>

          <Grid item lg={6} md={6}>
            <img
              style={{
                width: "100%",
                height: 880,
                backgroundSize: "cover",
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

export default SignUp;
