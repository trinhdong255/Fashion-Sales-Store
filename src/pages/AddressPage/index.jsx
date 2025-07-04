// pages/AddressPage/index.jsx
import { Container, Grid, Stack } from "@mui/material";

import AccountSideBar from "@/components/AccountSideBar";
import AddressInform from "./shared/AddressInform";

const Address = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Stack sx={{ m: "80px 0" }}>
          <Grid container>
            <Grid item xl={3} lg={3}>
              <AccountSideBar />
            </Grid>

            <Grid item xl={9} lg={9}>
              <h1
                style={{
                  fontWeight: "500",
                  width: "100%",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                ĐỊA CHỈ
              </h1>

              <Stack alignItems={"center"}>
                <AddressInform />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </section>
  );
};

export default Address;
