import { Button, Grid, Stack, TextField } from "@mui/material";
import styles from "./LoginPage.module.css";
const Login = () => {
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
          height: 600,
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
            <Stack sx={{ padding: "0px 36px" }}>
              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="email">
                  Email
                </label>
                <TextField id="email" label="Email" variant="outlined" />
              </Stack>
              <Stack className={styles.formLabelInput}>
                <label className={styles.labelInput} htmlFor="password">
                  Mật khẩu
                </label>
                <TextField id="password" label="Mật khẩu" variant="outlined" />
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
              >
                ĐĂNG NHẬP
              </Button>
            </Stack>

            <Stack sx={{ display: "flex", alignItems: "center" }}>
              <a className={styles.linkFooter} href="#">
                Bạn quên mật khẩu?
              </a>
              <span style={{ margin: "12px 0" }}>
                Bạn chưa có tài khoản?
                <a className={styles.linkFooter} href="#">
                  Tạo tài khoản ngay
                </a>
              </span>
            </Stack>
          </Grid>
          <Grid item lg={6} md={6}>
            <img
              style={{
                width: "100%",
                height: "600px",
                backgroundSize: "cover",
                borderRadius: 4,
              }}
              src="/src/assets/images/background-login.jpg"
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Login;
