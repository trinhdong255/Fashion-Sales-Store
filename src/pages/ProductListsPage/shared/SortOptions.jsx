// SortOptions.jsx
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { alpha, Button, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

const SortOptions = ({
  anchorEl,
  handleClose,
  handleSort,
  open,
  sortType,
  handleClick,
}) => {
  return (
    <>
      <p
        style={{
          color: "var(--text-color)",
          fontSize: 18,
        }}
      >
        Sắp xếp theo
      </p>

      <Button
        variant="contained"
        sx={{
          backgroundColor: sortType === "popularity" ? "black" : "white",
          color: sortType === "popularity" ? "white" : "black",
          borderColor: "#d9d9d9",
          borderRadius: 5,
          width: 110,
          height: 44,
          "&:hover": {
            backgroundColor: sortType === "popularity" ? "black" : alpha("#d9d9d9", 0.5),
          },
        }}
        onClick={() => handleSort("popularity")}
      >
        Bán chạy
      </Button>

      <Button
        variant="outlined"
        sx={{
          color: sortType === "newest" ? "white" : "black",
          backgroundColor: sortType === "newest" ? "black" : "white",
          borderColor: "#d9d9d9",
          borderRadius: 5,
          width: 110,
          height: 44,
          "&:hover": {
            backgroundColor: sortType === "newest" ? "black" : alpha("#d9d9d9", 0.5),
          },
        }}
        onClick={() => handleSort("newest")}
      >
        Mới nhất
      </Button>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<ArrowForwardIosIcon fontSize="small" />}
        sx={{
          color: "black",
          width: "20%",
          "&:hover": {
            backgroundColor: alpha("#d9d9d9", 0.5),
          },
        }}
      >
        {sortType === "asc"
          ? "Giá: Tăng dần"
          : sortType === "desc"
          ? "Giá: Giảm dần"
          : "Sắp xếp theo giá"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleSort("asc")}>Giá: Tăng dần</MenuItem>
        <MenuItem onClick={() => handleSort("desc")}>Giá: Giảm dần</MenuItem>
      </Menu>
    </>
  );
};

SortOptions.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  handleSort: PropTypes.func,
  open: PropTypes.bool,
  sortType: PropTypes.string,
  handleClick: PropTypes.func,
};

export default SortOptions;