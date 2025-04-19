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
  CircularProgress,
  Alert,
  Snackbar,
  Box,
  IconButton,
  Checkbox,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayoutWrapper from "@/layouts/DashboardLayout";
import {
  useListProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/services/api/product";
import { useListCategoriesQuery } from "@/services/api/categories";
import { useListColorsQuery } from "@/services/api/color";
import { useListSizesQuery } from "@/services/api/size";
import { useListImagesQuery, useUploadImageMutation, useDeleteImageMutation } from "@/services/api/productImage";
import { useGetMyInfoQuery } from "@/services/api/auth";
import {
  setColors,
  setLoading as setColorLoading,
  setError as setColorError,
  selectColors,
  selectLoading as selectColorLoading,
  selectError as selectColorError,
} from "@/store/redux/color/reducer";
import {
  setImages,
  setLoading as setImageLoading,
  setError as setImageError,
  selectImages,
  selectLoading as selectImageLoading,
  selectError as selectImageError,
} from "@/store/redux/productImage/reducer";

const ProductsManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = useSelector(selectColors);
  const colorLoading = useSelector(selectColorLoading);
  const colorError = useSelector(selectColorError);
  const images = useSelector(selectImages);
  const imageLoading = useSelector(selectImageLoading);
  const imageError = useSelector(selectImageError);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    status: "ACTIVE",
    colorId: "",
    sizeId: "",
    imageIds: [],
  });
  const [editProduct, setEditProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [products, setProducts] = useState([]);

  // Lấy dữ liệu từ API
  const { data: userInfo, error: userError, isLoading: userLoading } = useGetMyInfoQuery();
  const {
    data: productsData,
    isLoading: isFetchingProducts,
    error: fetchProductsError,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useListProductsQuery(
    { skip: 0, limit: 20 },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: categoriesData,
    isLoading: isFetchingCategories,
    error: fetchCategoriesError,
  } = useListCategoriesQuery();
  const {
    data: colorsData,
    isLoading: isFetchingColors,
    error: fetchColorsError,
  } = useListColorsQuery();
  const {
    data: sizesData,
    isLoading: isFetchingSizes,
    error: fetchSizesError,
  } = useListSizesQuery({ pageNo: 1, pageSize: 50 });
  const {
    data: imagesData,
    isLoading: isFetchingImages,
    error: fetchImagesError,
    refetch: refetchImages,
  } = useListImagesQuery({ pageNo: 1 });

  // Sử dụng RTK Query mutations
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const [deleteImage] = useDeleteImageMutation();

  // Cập nhật products khi productsData thay đổi
  useEffect(() => {
    if (productsData?.result?.items) {
      const updatedProducts = productsData.result.items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category || { id: null, name: "N/A" },
        price: item.price != null ? item.price : null,
        description: item.description || "",
        quantity: item.quantity || 0,
        colors: item.colors || [],
        sizes: item.sizes || [],
        productImages: item.productImages || [],
        status: item.status || "ACTIVE",
      }));
      console.log("Updated products:", updatedProducts);
      setProducts(updatedProducts);
    }
  }, [productsData]);

  // Buộc refetch khi component mount
  useEffect(() => {
    refetchProducts();
    refetchImages();
  }, [refetchProducts, refetchImages]);

  // Xử lý lỗi sản phẩm
  useEffect(() => {
    if (fetchProductsError || isProductsError) {
      const errorMessage = fetchProductsError?.data?.message || fetchProductsError?.error || "Lỗi khi tải sản phẩm";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      if (fetchProductsError?.status === 401) {
        setSnackbar({
          open: true,
          message: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại",
          severity: "error",
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } else if (products.length === 0 && productsData?.result?.items?.length === 0) {
      setSnackbar({
        open: true,
        message: "Hiện tại không có sản phẩm nào.",
        severity: "info",
      });
    }
  }, [fetchProductsError, isProductsError, productsData, products, navigate]);

  useEffect(() => {
    dispatch(setColorLoading(isFetchingColors));
    if (fetchColorsError) {
      dispatch(setColorError(fetchColorsError?.data?.message || "Lỗi khi tải danh sách màu"));
      setSnackbar({
        open: true,
        message: "Lỗi khi tải danh sách màu: " + (fetchColorsError?.data?.message || "Không xác định"),
        severity: "error",
      });
    } else if (colorsData) {
      dispatch(setColors(colorsData));
      dispatch(setColorError(null));
    }
  }, [colorsData, isFetchingColors, fetchColorsError, dispatch]);

  useEffect(() => {
    dispatch(setImageLoading(isFetchingImages));
    if (fetchImagesError) {
      const errorMessage = fetchImagesError?.data?.message || "Lỗi khi tải danh sách hình ảnh, vui lòng thử lại hoặc upload hình ảnh mới";
      dispatch(setImageError(errorMessage));
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } else if (imagesData) {
      dispatch(setImages(imagesData));
      dispatch(setImageError(null));
    }
  }, [imagesData, isFetchingImages, fetchImagesError, dispatch]);

  useEffect(() => {
    if (fetchCategoriesError) {
      setSnackbar({
        open: true,
        message: "Lỗi khi tải danh mục: " + (fetchCategoriesError?.data?.message || "Không xác định"),
        severity: "error",
      });
    }
    if (fetchSizesError) {
      setSnackbar({
        open: true,
        message: "Lỗi khi tải danh sách kích thước: " + (fetchSizesError?.data?.message || "Không xác định"),
        severity: "error",
      });
    }
  }, [fetchCategoriesError, fetchSizesError]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên", width: 150 },
    {
      field: "category",
      headerName: "Danh mục",
      width: 150,
      renderCell: (params) => params.row.category?.name || "N/A",
    },
    {
      field: "price",
      headerName: "Giá",
      width: 120,
      renderCell: (params) => params.row.price != null ? params.row.price : "N/A",
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <>
          <Button variant="text" color="primary" onClick={() => handleEditProduct(params.row)}>
            Sửa
          </Button>
          <Button variant="text" color="error" onClick={() => handleOpenDeleteDialog(params.row.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const handleEditProduct = (product) => {
    console.log("Edit product data:", product);
    setEditProduct({ ...product });
    setNewProduct({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      quantity: product.quantity?.toString() || "",
      categoryId: product.category?.id || "",
      status: product.status || "ACTIVE",
      colorId: product.colors?.[0]?.id || "",
      sizeId: product.sizes?.[0]?.id || "",
      imageIds: [],
    });
    setOpenDialog(true);
  };

  const handleOpenAddProductDialog = () => {
    setEditProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
      status: "ACTIVE",
      colorId: "",
      sizeId: "",
      imageIds: [],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
      status: "ACTIVE",
      colorId: "",
      sizeId: "",
      imageIds: [],
    });
  };

  const validateProductData = (product) => {
    const errors = [];
    console.log("Validating product:", product);

    if (!product.name.trim()) errors.push("Tên sản phẩm không được để trống");
    if (!product.description.trim()) errors.push("Mô tả sản phẩm không được để trống");
    if (!product.price || isNaN(parseFloat(product.price))) errors.push("Giá sản phẩm không hợp lệ");
    if (!product.quantity || isNaN(parseInt(product.quantity))) errors.push("Số lượng sản phẩm không hợp lệ");
    if (!product.categoryId) errors.push("Danh mục không được để trống");
    if (!product.colorId) errors.push("Phải chọn một màu");
    if (!product.sizeId) errors.push("Phải chọn một kích thước");
    if (!editProduct && product.imageIds.length === 0) errors.push("Phải chọn ít nhất một hình ảnh");

    return errors;
  };

  const handleAddProduct = async () => {
    console.log("Sending product for add:", newProduct);
    console.log("Selected imageIds:", newProduct.imageIds);
    const errors = validateProductData(newProduct);
    if (errors.length > 0) {
      setSnackbar({
        open: true,
        message: errors.join(". "),
        severity: "error",
      });
      return;
    }

    try {
      const response = await addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
        categoryId: parseInt(newProduct.categoryId),
        colorIds: newProduct.colorId ? [Number(newProduct.colorId)] : [],
        sizeIds: newProduct.sizeId ? [Number(newProduct.sizeId)] : [],
        imageIds: newProduct.imageIds.map(Number),
      }).unwrap();
      console.log("Add response:", response);
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: "Thêm sản phẩm thành công!",
        severity: "success",
      });
      refetchImages();
      refetchProducts();
    } catch (error) {
      const errorMessage = Array.isArray(error.data?.errors)
        ? error.data.errors.join(". ")
        : error.data?.message || "Lỗi khi thêm sản phẩm";
      console.error("Add error:", error);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleUpdateProduct = async () => {
    console.log("Sending product for update:", newProduct);
    const errors = validateProductData(newProduct);
    if (errors.length > 0) {
      setSnackbar({
        open: true,
        message: errors.join(". "),
        severity: "error",
      });
      return;
    }

    try {
      const payload = {
        id: editProduct.id,
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
        categoryId: parseInt(newProduct.categoryId),
        colorIds: newProduct.colorId ? [Number(newProduct.colorId)] : [],
        sizeIds: newProduct.sizeId ? [Number(newProduct.sizeId)] : [],
      };
      console.log("Payload sent to updateProduct:", payload);
      const response = await updateProduct(payload).unwrap();
      console.log("Update response:", response);

      setSnackbar({
        open: true,
        message: "Cập nhật sản phẩm thành công! Lưu ý: Hình ảnh không thể cập nhật do backend thiếu endpoint PUT.",
        severity: "success",
      });

      handleCloseDialog();
      refetchImages();
      refetchProducts();
    } catch (error) {
      const errorMessage = error.status === 404
        ? "Backend không có endpoint PUT /v1/products/:id. Vui lòng liên hệ team backend!"
        : error.status === 405
        ? "Backend không hỗ trợ phương thức PUT. Vui lòng liên hệ team backend!"
        : Array.isArray(error.data?.errors)
        ? error.data.errors.join(". ")
        : error.data?.message || "Lỗi khi cập nhật sản phẩm";
      console.error("Update error:", error);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productToDelete).unwrap();
      setOpenDeleteDialog(false);
      setProductToDelete(null);
      setSnackbar({
        open: true,
        message: "Xóa sản phẩm thành công!",
        severity: "success",
      });

      setProducts(products.filter((product) => product.id !== productToDelete));
      refetchProducts();
    } catch (error) {
      const errorMessage = Array.isArray(error.data?.errors)
        ? error.data.errors.join(". ")
        : error.data?.message || "Lỗi khi xóa sản phẩm";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file).unwrap();
      console.log("Upload image response:", response);
      setSnackbar({
        open: true,
        message: "Tải lên hình ảnh thành công!",
        severity: "success",
      });
      refetchImages();

      const newImageId = response.result?.id;
      if (newImageId) {
        if (!newProduct.imageIds.includes(newImageId)) {
          const updatedImageIds = [...newProduct.imageIds, newImageId];
          setNewProduct({ ...newProduct, imageIds: updatedImageIds });
        } else {
          setSnackbar({
            open: true,
            message: "Hình ảnh đã được chọn trước đó!",
            severity: "warning",
          });
        }
      }
    } catch (error) {
      const errorMessage = error.error?.data?.message || "Lỗi khi tải lên hình ảnh";
      console.error("Upload image error:", {
        status: error.error?.status,
        data: error.error?.data,
        message: errorMessage,
      });
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleDeleteImage = async (imageId, fromCurrent = false) => {
    const imageExists = imagesData?.some((img) => img.id === imageId);

    if (!imageExists && fromCurrent) {
      setEditProduct((prev) => ({
        ...prev,
        productImages: prev.productImages.filter((img) => img.id !== imageId),
      }));
      setSnackbar({
        open: true,
        message: "Hình ảnh không tồn tại trong hệ thống, đã xóa khỏi giao diện.",
        severity: "warning",
      });
      return;
    }

    if (fromCurrent) {
      setEditProduct((prev) => {
        const updatedProduct = {
          ...prev,
          productImages: prev.productImages.filter((img) => img.id !== imageId),
        };
        console.log("Updated editProduct:", updatedProduct);
        return updatedProduct;
      });
    } else {
      setNewProduct((prev) => ({
        ...prev,
        imageIds: prev.imageIds.filter((id) => id !== imageId),
      }));
    }

    try {
      await deleteImage(imageId).unwrap();
      setSnackbar({
        open: true,
        message: "Xóa hình ảnh thành công!",
        severity: "success",
      });
    } catch (error) {
      const errorMessage = error.data?.message || "Lỗi khi xóa hình ảnh";
      console.error("Delete image error:", error);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }

    refetchImages();
    refetchProducts();
  };

  const handleSelectImage = (imageId) => {
    const updatedImageIds = newProduct.imageIds.includes(imageId)
      ? newProduct.imageIds.filter((id) => id !== imageId)
      : [...newProduct.imageIds, imageId];

    setNewProduct({ ...newProduct, imageIds: updatedImageIds });
  };

  if (userLoading || isFetchingProducts || isFetchingCategories || isFetchingColors || isFetchingSizes || isFetchingImages) {
    return <CircularProgress />;
  }

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
            color="primary"
            onClick={handleOpenAddProductDialog}
            fullWidth
          >
            Thêm sản phẩm
          </Button>
        </Grid>
      </Grid>

      {fetchProductsError ? (
        <Alert severity="error">{fetchProductsError?.data?.message || "Lỗi khi tải sản phẩm"}</Alert>
      ) : products.length === 0 ? (
        <Alert severity="info">Hiện tại không có sản phẩm nào.</Alert>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: true,
                  name: true,
                  category: true,
                  price: true,
                  actions: true,
                },
              },
            }}
            aria-label="Bảng sản phẩm"
          />
        </div>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
            required
          />
          <TextField
            label="Mô tả"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
            required
          />
          <TextField
            label="Giá"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
            required
          />
          <TextField
            label="Số lượng"
            type="number"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
            required
          />
          <FormControl fullWidth sx={{ mt: 2 }} required>
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              label="Danh mục"
            >
              {Array.isArray(categoriesData) ? (
                categoriesData.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Không có danh mục</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} required>
            <InputLabel>Màu</InputLabel>
            <Select
              value={newProduct.colorId}
              onChange={(e) => setNewProduct({ ...newProduct, colorId: e.target.value })}
              label="Màu"
            >
              {Array.isArray(colorsData) ? (
                colorsData.map((color) => (
                  <MenuItem key={color.id} value={color.id}>
                    {color.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Không có màu</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} required>
            <InputLabel>Kích thước</InputLabel>
            <Select
              value={newProduct.sizeId}
              onChange={(e) => setNewProduct({ ...newProduct, sizeId: e.target.value })}
              label="Kích thước"
            >
              {Array.isArray(sizesData) ? (
                sizesData.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Không có kích thước</MenuItem>
              )}
            </Select>
          </FormControl>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Hình ảnh sản phẩm
          </Typography>
          {editProduct && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Hình ảnh hiện tại:</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {editProduct.productImages?.length > 0 ? (
                  editProduct.productImages.map((image) => (
                    <Box key={image.id} sx={{ textAlign: "center", position: "relative" }}>
                      <img
                        src={image.imageUrl}
                        alt={image.fileName}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                      <IconButton
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        color="error"
                        onClick={() => handleDeleteImage(image.id, true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant="caption">{image.fileName}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>Không có hình ảnh hiện tại.</Typography>
                )}
              </Box>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Danh sách hình ảnh có sẵn:</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {imagesData && imagesData.length > 0 ? (
                imagesData.map((image) => (
                  <Box key={image.id} sx={{ textAlign: "center", position: "relative" }}>
                    <Checkbox
                      checked={newProduct.imageIds.includes(image.id)}
                      onChange={() => handleSelectImage(image.id)}
                    />
                    <img
                      src={image.imageUrl}
                      alt={image.fileName}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Typography variant="caption">{image.fileName}</Typography>
                  </Box>
                ))
              ) : (
                <Typography>Không có hình ảnh nào trong hệ thống.</Typography>
              )}
            </Box>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Hình ảnh đã upload:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {newProduct.imageIds.length > 0 && imagesData ? (
                imagesData
                  .filter((img) => newProduct.imageIds.includes(img.id))
                  .map((image) => (
                    <Box key={image.id} sx={{ textAlign: "center", position: "relative" }}>
                      <img
                        src={image.imageUrl}
                        alt={image.fileName}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                      <IconButton
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        color="error"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant="caption">{image.fileName}</Typography>
                    </Box>
                  ))
              ) : (
                <Typography>Chưa upload hoặc chọn hình ảnh.</Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              component="label"
              sx={{ mt: 2 }}
              startIcon={<AddPhotoAlternateIcon />}
            >
              Tải lên hình ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUploadImage}
              />
            </Button>
          </Box>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
              label="Trạng thái"
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={editProduct ? handleUpdateProduct : handleAddProduct}
            variant="contained"
            color="primary"
          >
            {editProduct ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setOpenDeleteDialog(false)}>
            Hủy
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteProduct}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayoutWrapper>
  );
};

export default ProductsManagement;