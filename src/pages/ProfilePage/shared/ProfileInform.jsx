import { Upload } from "@mui/icons-material";
import { alpha, Button, Stack } from "@mui/material";
// import { useEffect, useState } from "react";

const ProfileInform = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <div
      style={{
        border: "1px solid black",
        width: "100%",
        height: "100%",
        padding: "200px 0",
        borderRadius: 5,
      }}
    >
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
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
      </Stack>
    </div>
  );
};

export default ProfileInform;
