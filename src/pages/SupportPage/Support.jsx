import {
  createTheme,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import WallpaperRepresentative from "../../components/WallpaperRepresentative/WallpaperRepresentative";

const Support = () => {
  const outerTheme = useTheme();

  return (
      <WallpaperRepresentative
        titleHeader="Chúng tôi có thể giúp gì cho bạn ?"
        searchSupport={
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              id="outlined-basic"
              label="Tìm kiếm sự hỗ trợ"
              variant="standard"
              sx={{
                width: "660px",
              }}
            />
          </ThemeProvider>
        }
      />
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
            "--TextField-brandBorderColor": "white",
            "--TextField-brandBorderHoverColor": "white",
            "--TextField-brandBorderFocusedColor": "white",
            "& label": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: "1.2rem",
            color: "white",
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

export default Support;
