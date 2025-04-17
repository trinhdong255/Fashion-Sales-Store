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
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import DashboardLayoutWrapper from "@/layouts/DashboardLayout";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    status: "ACTIVE",
    variants: [{ price: "", quantity: "", color: "", size: "" }],
    images: [],
  });
  const [editProduct, setEditProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách sản phẩm
        const productsRes = await axios.get("http://localhost:3000/products");
        setProducts(productsRes.data);

        // Lấy danh sách danh mục
        const categoriesRes = await axios.get("http://localhost:3000/categories");
        setCategories(categoriesRes.data);

        // Lấy danh sách màu
        const colorsRes = await axios.get("http://localhost:3000/colors");
        setColors(colorsRes.data);

        // Lấy danh sách kích thước
        const sizesRes = await axios.get("http://localhost:3000/sizes");
        setSizes(sizesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên", width: 150 },
    {
      field: "category",
      headerName: "Danh mục",
      width: 150,
      valueGetter: (params) => params.row.category?.name || "",
    },
    {
      field: "price",
      headerName: "Giá",
      width: 120,
      valueGetter: (params) =>
        params.row.variants?.[0]?.price || "N/A",
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditProduct(params.row)}>Sửa</Button>
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

  const handleAddVariant = () => {
    setNewProduct({
      ...newProduct,
      variants: [
        ...newProduct.variants,
        { price: "", quantity: "", color: "", size: "" },
      ],
    });
  };

  const handleRemoveVariant = (index) => {
    setNewProduct({
      ...newProduct,
      variants: newProduct.variants.filter((_, i) => i !== index),
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index][field] = value;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      fileName: file.name,
      imageUrl: URL.createObjectURL(file), // Giả lập URL, trong thực tế cần upload lên server
    }));
    setNewProduct({ ...newProduct, images: imageUrls });
  };

  const handleAddProduct = async () => {
    try {
      // Chuẩn bị dữ liệu để gửi lên server
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        categoryId: newProduct.category,
        status: newProduct.status,
        variants: newProduct.variants.map((variant) => ({
          price: parseFloat(variant.price),
          quantity: parseInt(variant.quantity),
          colorId: variant.color,
          sizeId: variant.size,
        })),
        images: newProduct.images.map((image) => ({
          fileName: image.fileName,
          imageUrl: image.imageUrl, // Trong thực tế, cần upload file và lấy URL từ server
        })),
      };

      await axios.post("http://localhost:3000/products", productData);
      const productsRes = await axios.get("http://localhost:3000/products");
      setProducts(productsRes.data);
      setNewProduct({
        name: "",
        description: "",
        category: "",
        status: "ACTIVE",
        variants: [{ price: "", quantity: "", color: "", size: "" }],
        images: [],
      });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      category: product.category?.id || "",
      status: product.status,
      variants: product.variants?.length
        ? product.variants.map((v) => ({
            price: v.price,
            quantity: v.quantity,
            color: v.color?.id || "",
            size: v.size?.id || "",
          }))
        : [{ price: "", quantity: "", color: "", size: "" }],
      images: product.images || [],
    });
    setOpenDialog(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        categoryId: newProduct.category,
        status: newProduct.status,
        variants: newProduct.variants.map((variant) => ({
          price: parseFloat(variant.price),
          quantity: parseInt(variant.quantity),
          colorId: variant.color,
          sizeId: variant.size,
        })),
        images: newProduct.images.map((image) => ({
          fileName: image.fileName,
          imageUrl: image.imageUrl,
        })),
      };

      await axios.put(
        `http://localhost:3000/products/${editProduct.id}`,
        productData
      );
      const productsRes = await axios.get("http://localhost:3000/products");
      setProducts(productsRes.data);
      setEditProduct(null);
      setNewProduct({
        name: "",
        description: "",
        category: "",
        status: "ACTIVE",
        variants: [{ price: "", quantity: "", color: "", size: "" }],
        images: [],
      });
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${productToDelete}`);
      const productsRes = await axios.get("http://localhost:3000/products");
      setProducts(productsRes.data);
      setOpenDeleteDialog(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <DashboardLayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Quản lý Sản phẩm
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            fullWidth
          >
            Thêm sản phẩm
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {/* Dialog thêm/sửa sản phẩm */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Mô tả"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              label="Danh mục"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newProduct.status}
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.value })
              }
              label="Trạng thái"
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>

          {/* Product Variants */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Biến thể sản phẩm
          </Typography>
          {newProduct.variants.map((variant, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, mt: 2, alignItems: "center" }}>
              <TextField
                label="Giá"
                type="number"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                sx={{ flex: 1 }}
              />
              <TextField
                label="Số lượng"
                type="number"
                value={variant.quantity}
                onChange={(e) =>
                  handleVariantChange(index, "quantity", e.target.value)
                }
                sx={{ flex: 1 }}
              />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Màu</InputLabel>
                <Select
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                  label="Màu"
                >
                  {colors.map((color) => (
                    <MenuItem key={color.id} value={color.id}>
                      {color.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Kích thước</InputLabel>
                <Select
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  label="Kích thước"
                >
                  {sizes.map((size) => (
                    <MenuItem key={size.id} value={size.id}>
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                onClick={() => handleRemoveVariant(index)}
                color="error"
                disabled={newProduct.variants.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddVariant}
            sx={{ mt: 2 }}
          >
            Thêm biến thể
          </Button>

          {/* Product Images */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Hình ảnh sản phẩm
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ marginTop: "16px" }}
          />
          <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
            {newProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={image.fileName}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button
            onClick={editProduct ? handleUpdateProduct : handleAddProduct}
            variant="contained"
          >
            {editProduct ? "Cập nhật" : "Thêm"}
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
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button
            onClick={handleDeleteProduct}
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

export default ProductsManagement;