import { Upload } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { alpha, Button, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

const ProfileInform = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      style={{
        border: "1px solid black",
        width: "100%",
        paddingTop: 120,
        borderRadius: 5,
      }}
    >
      {user && (
        <>
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button
              variant="outlined"
              startIcon={<Upload />}
              sx={{
                borderColor: "black",
                color: "black",
                "&:hover": {
                  backgroundColor: alpha("#d9d9d9", 0.5),
                },
              }}
            >
              Chọn ảnh
            </Button>
          </Stack>

          <Stack sx={{ m: "32px 24px" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6" sx={{ width: "30%" }}>
                Tên đăng nhập:
              </Typography>
              <Typography variant="body1">{user.username}</Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6" sx={{ width: "30%" }}>
                Tên:
              </Typography>
              <TextField variant="outlined" label="Nhập tên" size="small" />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6" sx={{ width: "30%" }}>
                Email:
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6" sx={{ width: "30%" }}>
                Số điện thoại:{" "}
              </Typography>
              <TextField
                variant="outlined"
                label="Số điện thoại"
                size="small"
              />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6" sx={{ width: "30%" }}>
                Giới tính:
              </Typography>
              <RadioGroup row >
                <Radio></Radio>
              </RadioGroup>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6">Ngày sinh: </Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              sx={{ m: "10px 0" }}
            >
              <Typography variant="h6">Địa chỉ: </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
};

export default ProfileInform;
