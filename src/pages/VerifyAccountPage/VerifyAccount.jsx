import {
  Button,
  createTheme,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./VerifyAccount.module.css";

const VerifyAccount = () => {
  const outerTheme = useTheme();
  const [otpTimer, setOtpTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dữ liệu form:", data);
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

  return (
    <Stack
      sx={{
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
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
          height: 480,
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
              XÁC THỰC TÀI KHOẢN
            </h2>

            <Stack
              sx={{ padding: "0px 36px" }}
              component={"form"}
              onSubmit={handleSubmit(onSubmit)}
            >
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
                    margin: "20px 0",
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
                XÁC NHẬN
              </Button>
            </Stack>
          </Grid>

          <Grid item lg={6} md={6}>
            <img
              style={{
                width: "100%",
                height: 480,
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

export default VerifyAccount;
