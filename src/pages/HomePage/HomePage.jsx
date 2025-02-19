import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Stack } from "@mui/material";

const Home = () => {
  // const settings = {
  //   dots: true, // Hiển thị dấu chấm chuyển slide
  //   infinite: true, // Lặp lại vô hạn
  //   speed: 500, // Tốc độ chuyển slide (ms)
  //   slidesToShow: 1, // Số lượng slide hiển thị
  //   slidesToScroll: 1, // Số lượng slide cuộn mỗi lần
  //   autoplay: true, // Tự động chuyển slide
  //   autoplaySpeed: 3000, // Thời gian giữa các lần chuyển (ms)
  // };

  return (
    <Container>
       {/* <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        style={{ width: "80%", margin: "0 auto" }}
      >
        <Slider {...settings}>
          <div>
            <h3>Slide 1</h3>
          </div>
          <div>
            <h3>Slide 2</h3>
          </div>
          <div>
            <h3>Slide 3</h3>
          </div>
          <div>
            <h3>Slide 4</h3>
          </div>
        </Slider>
      </Stack>  */}
    </Container>
  );
};

export default Home;
