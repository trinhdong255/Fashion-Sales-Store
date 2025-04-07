import { alpha, Button, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SortOptions = ({
  anchorEl,
  handleClose,
  handleSort,
  open,
  sortOrder,
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
          backgroundColor: "black",
          borderRadius: 5,
          width: 110,
          height: 44,
        }}
      >
        Bán chạy
      </Button>

      <Button
        variant="outlined"
        sx={{
          color: "black",
          backgroundColor: "white",
          borderColor: "#d9d9d9",
          borderRadius: 5,
          width: 110,
          height: 44,
          "&:hover": {
            backgroundColor: alpha("#d9d9d9", 0.5),
          },
        }}
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
        {sortOrder === "asc"
          ? "Giá: Tăng dần"
          : sortOrder === "desc"
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
  anchorEl: PropTypes.string,
  handleClose: PropTypes.func,
  handleSort: PropTypes.func,
  open: PropTypes.bool,
  sortOrder: PropTypes.string,
  handleClick: PropTypes.func,
};

export default SortOptions;
