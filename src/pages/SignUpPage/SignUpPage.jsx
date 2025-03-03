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
import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";

const SignUp = () => {
  const outerTheme = useTheme();

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
          width: 800,
          height: 800,
          borderRadius: 4,
          boxShadow: "0px 4px 30px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Grid container>
          <Grid item lg={6} md={6}>
            <h2
              style={{
                textAlign: "center",
                margin: "40px 0 10px 0",
                fontWeight: "inherit",
              }}
            >
              TẠO TÀI KHOẢN
            </h2>
            <Stack sx={{ padding: "0px 36px" }}>
              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="fullName">
                  Họ và tên
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="fullName"
                    label="Họ và tên"
                    variant="outlined"
                  />
                </ThemeProvider>
              </Stack>

              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="phone">
                  Số điện thoại
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="phone"
                    label="Số điện thoại"
                    variant="outlined"
                  />
                </ThemeProvider>
              </Stack>

              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="email">
                  Email
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField id="email" label="Email" variant="outlined" />
                </ThemeProvider>
              </Stack>

              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="password">
                  Mật khẩu
                </label>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="password"
                    label="Mật khẩu"
                    variant="outlined"
                  />
                </ThemeProvider>
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
                  />
                </ThemeProvider>
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
                height: 800,
                backgroundSize: "cover",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
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
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

export default SignUp;
