import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import axios from "axios";
import DashboardLayoutWrapper from "@/layouts/DashboardLayout";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
  });
  const [editCategory, setEditCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên", width: 150 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditCategory(params.row)}>Sửa</Button>
          <Button
            onClick={() => handleOpenDeleteDialog(params.row.id)}
            color="error"
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const handleAddCategory = async () => {
    try {
      await axios.post("http://localhost:3000/categories", newCategory);
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
      setNewCategory({ name: "", description: "", status: "ACTIVE" });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description || "",
      status: category.status,
    });
    setOpenDialog(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        `http://localhost:3000/categories/${editCategory.id}`,
        newCategory
      );
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
      setEditCategory(null);
      setNewCategory({ name: "", description: "", status: "ACTIVE" });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setCategoryToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:3000/categories/${categoryToDelete}`);
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <DashboardLayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Quản lý Danh mục
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            fullWidth
          >
            Thêm danh mục
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {/* Dialog thêm/sửa danh mục */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editCategory ? "Sửa danh mục" : "Thêm danh mục"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Mô tả"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newCategory.status}
              onChange={(e) =>
                setNewCategory({ ...newCategory, status: e.target.value })
              }
              label="Trạng thái"
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button
            onClick={editCategory ? handleUpdateCategory : handleAddCategory}
            variant="contained"
          >
            {editCategory ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa danh mục này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button
            onClick={handleDeleteCategory}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayoutWrapper>
  );
};

export default CategoriesManagement;