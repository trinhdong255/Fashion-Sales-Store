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
  Grid,
} from "@mui/material";
import axios from "axios";
import DashboardLayoutWrapper from "@/layouts/DashboardLayout";

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
  });
  const [editRole, setEditRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // Lấy danh sách vai trò
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên", width: 150 },
    { field: "description", headerName: "Mô tả", width: 200 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditRole(params.row)}>Sửa</Button>
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

  const handleAddRole = async () => {
    try {
      await axios.post("http://localhost:3000/roles", newRole);
      const response = await axios.get("http://localhost:3000/roles");
      setRoles(response.data);
      setNewRole({ name: "", description: "" });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const handleEditRole = (role) => {
    setEditRole(role);
    setNewRole({
      name: role.name,
      description: role.description || "",
    });
    setOpenDialog(true);
  };

  const handleUpdateRole = async () => {
    try {
      await axios.put(`http://localhost:3000/roles/${editRole.id}`, newRole);
      const response = await axios.get("http://localhost:3000/roles");
      setRoles(response.data);
      setEditRole(null);
      setNewRole({ name: "", description: "" });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setRoleToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteRole = async () => {
    try {
      await axios.delete(`http://localhost:3000/roles/${roleToDelete}`);
      const response = await axios.get("http://localhost:3000/roles");
      setRoles(response.data);
      setOpenDeleteDialog(false);
      setRoleToDelete(null);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <DashboardLayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Quản lý Vai trò
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            fullWidth
          >
            Thêm vai trò
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {/* Dialog thêm/sửa vai trò */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editRole ? "Sửa vai trò" : "Thêm vai trò"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={newRole.name}
            onChange={(e) =>
              setNewRole({ ...newRole, name: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Mô tả"
            value={newRole.description}
            onChange={(e) =>
              setNewRole({ ...newRole, description: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button
            onClick={editRole ? handleUpdateRole : handleAddRole}
            variant="contained"
          >
            {editRole ? "Cập nhật" : "Thêm"}
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
          <Typography>Bạn có chắc chắn muốn xóa vai trò này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button
            onClick={handleDeleteRole}
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

export default RolesManagement;