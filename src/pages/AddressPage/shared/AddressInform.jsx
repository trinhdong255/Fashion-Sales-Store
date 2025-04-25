import {
  Box,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/redux/user/reducer";
import { useListProvincesQuery } from "@/services/api/province";
import {
  useListDistrictsByProvinceQuery,
  useListWardsByDistrictQuery,
} from "@/services/api/district";
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "@/services/api/address";

const AddressInform = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser); // Lấy user từ Redux store

  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [streetDetail, setStreetDetail] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Điều hướng về login nếu không có user
  useEffect(() => {
    if (!user) {
      console.log("No user found in Redux store");
      navigate("/login");
    }
  }, [user, navigate]);

  // Lấy danh sách địa chỉ của người dùng
  const {
    data: addressesData,
    isLoading: addressesLoading,
    error: addressesError,
    refetch,
  } = useGetAddressesQuery(
    { pageSize: 50 },
    {
      skip: !user || !localStorage.getItem("accessToken"),
      pollingInterval: 0,
      refetchOnMountOrArgChange: true,
      retry: 2,
    }
  );

  // Log để debug
  console.log("Addresses Data:", addressesData);
  console.log("Addresses Loading:", addressesLoading);
  console.log("Addresses Error:", addressesError);

  // Lấy danh sách tỉnh/thành phố
  const { data: provincesData, isLoading: provincesLoading } =
    useListProvincesQuery({ pageSize: 60 });

  // Lấy danh sách quận/huyện theo tỉnh
  const { data: districtsData, isLoading: districtsLoading } =
    useListDistrictsByProvinceQuery(
      { provinceId, pageSize: 50 },
      { skip: !provinceId }
    );

  // Lấy danh sách phường/xã theo quận/huyện
  const { data: wardsData, isLoading: wardsLoading } =
    useListWardsByDistrictQuery(
      { districtId, pageSize: 50 },
      { skip: !districtId }
    );

  // Mutation để thêm, sửa, xóa địa chỉ
  const [createAddress, { isLoading: createLoading }] =
    useCreateAddressMutation();
  const [updateAddress, { isLoading: updateLoading }] =
    useUpdateAddressMutation();
  const [deleteAddress, { isLoading: deleteLoading }] =
    useDeleteAddressMutation();

  const handleShowSnackbar = (success, message = "") => {
    setSnackbar({
      open: true,
      message: message || (success ? "Thành công!" : "Thất bại!"),
      severity: success ? "success" : "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const resetForm = () => {
    setProvinceId("");
    setDistrictId("");
    setWardCode("");
    setStreetDetail("");
    setIsDefault(false);
    setIsEditing(false);
    setEditingAddressId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    const addressData = {
      isDefault,
      streetDetail,
      wardCode,
      districtId,
      provinceId,
    };

    try {
      if (isEditing) {
        await updateAddress({ addressId: editingAddressId, addressData }).unwrap();
        handleShowSnackbar(true, "Cập nhật địa chỉ thành công!");
      } else {
        await createAddress(addressData).unwrap();
        handleShowSnackbar(true, "Thêm địa chỉ thành công!");
        refetch();
      }
      resetForm();
    } catch (error) {
      handleShowSnackbar(false, error?.data?.message || "Có lỗi xảy ra!");
    }
  };

  const handleEdit = (address) => {
    setProvinceId(address.provinceId);
    setDistrictId(address.districtId);
    setWardCode(address.wardCode);
    setStreetDetail(address.streetDetail);
    setIsDefault(address.isDefault);
    setIsEditing(true);
    setEditingAddressId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteAddress(addressId).unwrap();
      handleShowSnackbar(true, "Xóa địa chỉ thành công!");
      refetch();
    } catch (error) {
      handleShowSnackbar(false, error?.data?.message || "Xóa địa chỉ thất bại!");
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

      <Box sx={{ width: "100%", p: 2 }}>
        {/* Danh sách địa chỉ */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Danh sách địa chỉ
        </Typography>
        {addressesError ? (
          <Typography color="error">
            Lỗi khi tải danh sách địa chỉ:{" "}
            {addressesError?.data?.message || "Không thể tải dữ liệu"}
          </Typography>
        ) : addressesLoading ? (
          <CircularProgress />
        ) : addressesData?.items?.length > 0 ? (
          <Stack spacing={2}>
            {addressesData.items.map((address) => (
              <Card key={address.id} sx={{ mb: 2 }}>
                <CardContent>
                  {/* Hiển thị thông tin người nhận (lấy từ user) */}
                  <Typography variant="body1">
                    {(user?.name || "Không có tên người nhận")} -{" "}
                    {(user?.phone || "Không có số điện thoại")}
                  </Typography>
                  {/* Hiển thị địa chỉ */}
                  <Typography variant="body1">
                    {(address.streetDetail || "Không có thông tin địa chỉ")}
                    {address.wardName ? `, ${address.wardName}` : ""}
                    {address.districtName ? `, ${address.districtName}` : ""}
                    {address.provinceName ? `, ${address.provinceName}` : ""}
                  </Typography>
                  {address.isDefault && (
                    <Typography variant="caption" color="primary">
                      Địa chỉ mặc định
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEdit(address)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(address.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography>Chưa có địa chỉ nào.</Typography>
        )}

        {/* Nút thêm địa chỉ mới */}
        {!showForm && (
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setShowForm(true)}
          >
            Thêm địa chỉ mới
          </Button>
        )}

        {/* Form thêm/sửa địa chỉ */}
        {showForm && (
          <Box
            sx={{
              border: "1px solid black",
              width: "100%",
              pt: 4,
              borderRadius: 5,
              mt: 4,
            }}
          >
            {/* Thông báo về thông tin người nhận */}
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ m: "24px 0 24px 64px" }}
            >
              Thông tin người nhận (tên và số điện thoại) sẽ được lấy từ Hồ sơ cá nhân. Vui lòng cập nhật trong Hồ sơ cá nhân nếu cần thay đổi.
            </Typography>

            <Box sx={{ m: "24px 0 24px 64px" }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ m: "40px 0" }}
                spacing={13}
              >
                <Typography variant="h6">Tỉnh/Thành phố: </Typography>
                <FormControl sx={{ m: 1, width: "300px" }} size="small">
                  <InputLabel id="province-label" color="default">
                    Tỉnh/Thành phố
                  </InputLabel>
                  <Select
                    labelId="province-label"
                    id="province-select"
                    value={provinceId}
                    label="Tỉnh/Thành phố"
                    onChange={(e) => {
                      setProvinceId(e.target.value);
                      setDistrictId("");
                      setWardCode("");
                    }}
                    color="default"
                    disabled={provincesLoading}
                  >
                    {provincesData?.items?.map((province) => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ m: "40px 0" }}
                spacing={17}
              >
                <Typography variant="h6">Quận/Huyện: </Typography>
                <FormControl sx={{ m: 1, width: "300px" }} size="small">
                  <InputLabel id="district-label" color="default">
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="district-label"
                    id="district-select"
                    value={districtId}
                    label="Quận/Huyện"
                    onChange={(e) => {
                      setDistrictId(e.target.value);
                      setWardCode("");
                    }}
                    color="default"
                    disabled={districtsLoading || !provinceId}
                  >
                    {districtsData?.items?.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ m: "40px 0" }}
                spacing={19}
              >
                <Typography variant="h6">Phường/Xã: </Typography>
                <FormControl sx={{ m: 1, width: "300px" }} size="small">
                  <InputLabel id="ward-label" color="default">
                    Phường/Xã
                  </InputLabel>
                  <Select
                    labelId="ward-label"
                    id="ward-select"
                    value={wardCode}
                    label="Phường/Xã"
                    onChange={(e) => setWardCode(e.target.value)}
                    color="default"
                    disabled={wardsLoading || !districtId}
                  >
                    {wardsData?.items?.map((ward) => (
                      <MenuItem key={ward.code} value={ward.code}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ m: "40px 0" }}
                spacing={23}
              >
                <Typography variant="h6">Địa chỉ: </Typography>
                <TextField
                  variant="outlined"
                  label="Nhập địa chỉ"
                  size="small"
                  color="default"
                  sx={{ width: "300px" }}
                  value={streetDetail}
                  onChange={(e) => setStreetDetail(e.target.value)}
                />
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ m: "40px 0" }}
                spacing={15}
              >
                <Typography variant="h6">Đặt làm mặc định: </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                  }
                  label="Đặt làm địa chỉ mặc định"
                />
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "var(--footer-background-color)",
                  padding: "12px 24px",
                }}
                onClick={handleSubmit}
                disabled={
                  createLoading ||
                  updateLoading ||
                  !streetDetail ||
                  !wardCode ||
                  !districtId ||
                  !provinceId
                }
              >
                {createLoading || updateLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isEditing ? (
                  "Cập nhật"
                ) : (
                  "Thêm địa chỉ"
                )}
              </Button>
              <Button
                variant="outlined"
                sx={{ padding: "12px 24px" }}
                onClick={resetForm}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddressInform;