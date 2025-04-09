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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import customTheme from "@/components/CustemTheme";

const ForgotPassword = () => {
  const outerTheme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dữ liệu form:", data);
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        height: "100vh",
        display: "flex",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "white",
          width: 800,
          height: 450,
          borderRadius: 4,
          boxShadow: "0px 4px 30px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item lg={6} md={6}>
            <h2
              style={{
                textAlign: "center",
                margin: "0 0 20px 0",
                fontWeight: "inherit",
              }}
            >
              QUÊN MẬT KHẨU
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
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px 24px",
                  marginTop: "30px",
                  fontSize: "1.2rem",
                  fontWeight: "regular",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                type="submit"
              >
                XÁC NHẬN EMAIL
              </Button>
            </Stack>

            <Stack sx={{ display: "flex", alignItems: "center" }}>
              <Link className={styles.linkFooter} to="/login">
                Trở về đăng nhập
              </Link>
            </Stack>
          </Grid>
          <Grid item lg={6} md={6}>
            <img
              style={{
                width: "100%",
                height: 450,
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

export default ForgotPassword;
