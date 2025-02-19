import { Container, Grid, Stack } from "@mui/material";
import styles from "./Footer.module.css";

const Footer = () => {
  const footerData = [
    {
      title: "Chăm sóc khách hàng",
      links: [
        "Trung tâm trợ giúp",
        "Cửa hàng Blog",
        "Hướng dẫn mua hàng",
        "Hướng dẫn bảo hành",
        "Trả hàng & hoàn tiền",
        "Chăm sóc khách hàng",
        "Chính sách bảo hành",
        "Vận chuyển",
      ],
    },
    {
      title: "Giới thiệu",
      links: [
        "Giới thiệu về chúng tôi",
        "Tuyển dụng",
        "Điều khoản",
        "Chính sách bảo mật",
        "Chính hãng",
        "Kênh người bán",
        "Flash Sales",
        "Chương trình tiếp thị liên kết",
      ],
    },
    {
      title: "Danh mục",
      links: [
        "Áo thun",
        "Áo sơ mi",
        "Áo khoác",
        "Quần dài",
        "Quần shorts",
        "Phụ kiện",
      ],
    },
    {
      title: "Theo dõi",
      links: ["Facebook", "LinkedIn", "Instagram", "Twitter"],
    },
  ];

  return (
    <Stack sx={{ backgroundColor: "#333", height: "543px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{ paddingTop: 32 }}>
          {footerData.map((value, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: "white",
                  padding: 0,
                }}
              >
                {value.title}
              </h3>
              <ul style={{ listStyleType: "none", paddingTop: 32 }}>
                {value.links.map((valueLink, linkIndex) => (
                  <li style={{ paddingBottom: 16 }} key={linkIndex}>
                    <a className={styles.footerLink} href="#">{valueLink}</a>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default Footer;
