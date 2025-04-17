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

const PromotionsManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    title: "",
    description: "",
    discount_percent: "",
    start_date: "",
    end_date: "",
    status: "ACTIVE",
  });
  const [editPromotion, setEditPromotion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);

  // Lấy danh sách khuyến mãi
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/promotions");
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Tiêu đề", width: 150 },
    { field: "discount_percent", headerName: "Giảm giá (%)", width: 120 },
    { field: "start_date", headerName: "Ngày bắt đầu", width: 150 },
    { field: "end_date", headerName: "Ngày kết thúc", width: 150 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditPromotion(params.row)}>Sửa</Button>
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

  const handleAddPromotion = async () => {
    try {
      const promotionData = {
        ...newPromotion,
        discount_percent: parseFloat(newPromotion.discount_percent),
      };
      await axios.post("http://localhost:3000/promotions", promotionData);
      const response = await axios.get("http://localhost:3000/promotions");
      setPromotions(response.data);
      setNewPromotion({
        title: "",
        description: "",
        discount_percent: "",
        start_date: "",
        end_date: "",
        status: "ACTIVE",
      });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding promotion:", error);
    }
  };

  const handleEditPromotion = (promotion) => {
    setEditPromotion(promotion);
    setNewPromotion({
      title: promotion.title,
      description: promotion.description || "",
      discount_percent: promotion.discount_percent,
      start_date: promotion.start_date,
      end_date: promotion.end_date,
      status: promotion.status,
    });
    setOpenDialog(true);
  };

  const handleUpdatePromotion = async () => {
    try {
      const promotionData = {
        ...newPromotion,
        discount_percent: parseFloat(newPromotion.discount_percent),
      };
      await axios.put(
        `http://localhost:3000/promotions/${editPromotion.id}`,
        promotionData
      );
      const response = await axios.get("http://localhost:3000/promotions");
      setPromotions(response.data);
      setEditPromotion(null);
      setNewPromotion({
        title: "",
        description: "",
        discount_percent: "",
        start_date: "",
        end_date: "",
        status: "ACTIVE",
      });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setPromotionToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeletePromotion = async () => {
    try {
      await axios.delete(`http://localhost:3000/promotions/${promotionToDelete}`);
      const response = await axios.get("http://localhost:3000/promotions");
      setPromotions(response.data);
      setOpenDeleteDialog(false);
      setPromotionToDelete(null);
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  return (
    <DashboardLayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Quản lý Khuyến mãi
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            fullWidth
          >
            Thêm khuyến mãi
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={promotions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {/* Dialog thêm/sửa khuyến mãi */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editPromotion ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tiêu đề"
            value={newPromotion.title}
            onChange={(e) =>
              setNewPromotion({ ...newPromotion, title: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Mô tả"
            value={newPromotion.description}
            onChange={(e) =>
              setNewPromotion({ ...newPromotion, description: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Giảm giá (%)"
            type="number"
            value={newPromotion.discount_percent}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
                discount_percent: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Ngày bắt đầu"
            type="date"
            value={newPromotion.start_date}
            onChange={(e) =>
              setNewPromotion({ ...newPromotion, start_date: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Ngày kết thúc"
            type="date"
            value={newPromotion.end_date}
            onChange={(e) =>
              setNewPromotion({ ...newPromotion, end_date: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newPromotion.status}
              onChange={(e) =>
                setNewPromotion({ ...newPromotion, status: e.target.value })
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
            onClick={
              editPromotion ? handleUpdatePromotion : handleAddPromotion
            }
            variant="contained"
          >
            {editPromotion ? "Cập nhật" : "Thêm"}
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
          <Typography>
            Bạn có chắc chắn muốn xóa khuyến mãi này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button
            onClick={handleDeletePromotion}
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

export default PromotionsManagement;