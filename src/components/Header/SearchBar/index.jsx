// SearchBar.js
import customTheme from "@/components/CustemTheme";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";

const SearchBar = () => {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField
        id="outlined-basic"
        label="Tìm kiếm sản phẩm..."
        size="small"
        variant="outlined"
        sx={{
          width: 400,
          "& .MuiOutlinedInput-root": {
            borderRadius: 100,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </ThemeProvider>
  );
};

export default SearchBar;
