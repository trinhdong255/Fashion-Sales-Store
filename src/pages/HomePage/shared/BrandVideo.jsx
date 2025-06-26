import { Container, Typography, Box } from "@mui/material";

const BrandVideo = () => {
  return (
    <section
      style={{
        backgroundColor: "#f9f9f9",
        padding: "60px 0",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              marginBottom: "12px",
              color: "#111",
            }}
          >
            Khám phá Fashion Store
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Hành trình sáng tạo & định hình phong cách thời trang hiện đại.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            paddingBottom: "50%", 
            height: 0,
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/REcwxteTASw?si=2J7vIDj6jLU5XPRD"
            title="Giới thiệu Fashion Store"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></iframe>
        </Box>
      </Container>
    </section>
  );
};

export default BrandVideo;
