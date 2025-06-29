import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import customTheme from "@/components/CustemTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "@/services/api/auth";
import { setUser } from "@/store/redux/user/reducer";

const ResetPassword = () => {
  const outerTheme = useTheme();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or 'error'
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Lấy forgotPasswordToken từ state
  const forgotPasswordToken = location.state?.forgotPasswordToken || "";

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (location.state?.message) {
      setSnackbar({
        open: true,
        message: location.state.message || "",
        severity: location.state.severity || "success",
      });
    }
    window.history.replaceState({}, document.title);
  }, [location]);

  const handleShowSnackbar = (success) => {
    if (success) {
      setSnackbar({
        open: true,
        message: "Đặt lại mật khẩu thành công !",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Đặt lại mật khẩu thất bại !",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword({
        forgotPasswordToken: forgotPasswordToken,
        newPassword: data?.newPassword,
        confirmPassword: data?.confirmPassword,
      }).unwrap();

      if (response) {
        const userData = {
          forgotPasswordToken: response.forgotPasswordToken,
          email: response.email,
          newPassword: response.newPassword,
          confirmPassword: response.confirmPassword,
        };
        dispatch(setUser(userData));
        navigate("/login");
      }
    } catch (error) {
      handleShowSnackbar(false);
      console.log("Reset password failed:", error);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box display="flex" alignItems="center" minHeight="100vh">
        <Grid
          container
          sx={{
            width: "100%",
            maxWidth: 1000,
            px: 3,
            py: 6,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Grid size={{ xs: 6, md: 6 }}>
            <Box sx={{ m: "0 50px" }}>
              <h1 style={{ margin: 0 }}>Đặt lại mật khẩu</h1>

              <p style={{ margin: "20px 0", fontSize: "1.1rem" }}>
                Vui lòng nhập mật khẩu mới.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="newPassword"
                    label="Mật khẩu mới"
                    fullWidth
                    type={showNewPassword ? "text" : "password"}
                    variant="outlined"
                    sx={{ mt: 4, mb: 4 }}
                    disabled={isLoading}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    {...register("newPassword", {
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
                            onMouseDown={handleMouseDownNewPassword}
                            onMouseUp={handleMouseUpNewPassword}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showNewPassword ? (
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

                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="confirmPassword"
                    label="Xác nhận mật khẩu"
                    variant="outlined"
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    sx={{ mb: 1 }}
                    disabled={isLoading}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                      required: "Vui lòng xác nhận mật khẩu",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Mật khẩu xác nhận không khớp",
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
                            onMouseDown={handleMouseDownConfirmPassword}
                            onMouseUp={handleMouseUpConfirmPassword}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
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

                <Button
                  variant="contained"
                  fullWidth
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={34} color="inherit" />
                  ) : (
                    "Đặt lại mật khẩu"
                  )}
                </Button>
              </form>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                objectFit: "cover",
              }}
              src="/src/assets/images/background-fashions/background-form.jpg"
            />
          </Grid>
        </Grid>
      </Box>

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
    </section>
  );
};

export default ResetPassword;
