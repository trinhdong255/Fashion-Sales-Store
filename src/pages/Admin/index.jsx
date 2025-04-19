import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardLayoutWrapper from "@/layouts/DashboardLayout";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
    pendingOrders: 0,
    reviews: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsRes = await axios.get(
          "http://localhost:3000/products/count"
        );
        const categoriesRes = await axios.get(
          "http://localhost:3000/categories/count"
        );
        const usersRes = await axios.get("http://localhost:3000/users/count");
        const ordersRes = await axios.get("http://localhost:3000/orders/count");
        const pendingOrdersRes = await axios.get(
          "http://localhost:3000/orders/count?status=PENDING"
        );
        const reviewsRes = await axios.get(
          "http://localhost:3000/reviews/count"
        );

        setStats({
          products: productsRes.data.count,
          categories: categoriesRes.data.count,
          users: usersRes.data.count,
          orders: ordersRes.data.count,
          pendingOrders: pendingOrdersRes.data.count,
          reviews: reviewsRes.data.count,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchRevenue = async () => {
      try {
        const revenueRes = await axios.get(
          "http://localhost:3000/orders/revenue?months=6"
        );
        setRevenueData(revenueRes.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    const fetchOrderStatus = async () => {
      try {
        const statusRes = await axios.get(
          "http://localhost:3000/orders/count-by-status"
        );
        setOrderStatusData(statusRes.data);
      } catch (error) {
        console.error("Error fetching order status data:", error);
      }
    };

    fetchStats();
    fetchRevenue();
    fetchOrderStatus();
  }, []);

  // Dữ liệu cho biểu đồ doanh thu (Line Chart)
  const revenueChartData = {
    labels: revenueData.map((data) => data.month), // Ví dụ: ["2025-04", "2025-03", ...]
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: revenueData.map((data) => data.revenue), // Ví dụ: [5000000, 4000000, ...]
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Doanh thu 6 tháng gần nhất" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Doanh thu (VND)" },
      },
      x: {
        title: { display: true, text: "Tháng" },
      },
    },
  };

  // Dữ liệu cho biểu đồ thống kê đơn hàng theo trạng thái (Bar Chart)
  const orderStatusChartData = {
    labels: ["Chờ xử lý", "Hoàn thành", "Đã hủy"], // PENDING, COMPLETED, CANCELLED
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: [
          orderStatusData.PENDING || 0,
          orderStatusData.COMPLETED || 0,
          orderStatusData.CANCELLED || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const orderStatusChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Thống kê đơn hàng theo trạng thái" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Số lượng đơn hàng" },
      },
      x: {
        title: { display: true, text: "Trạng thái" },
      },
    },
  };

  return (
    <DashboardLayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Tổng quan
      </Typography>

      {/* Biểu đồ doanh thu và thống kê đơn hàng */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Line data={revenueChartData} options={revenueChartOptions} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Bar
                data={orderStatusChartData}
                options={orderStatusChartOptions}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Các card thống kê hiện tại */}
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sản phẩm</Typography>
              <Typography variant="h4">{stats.products} sản phẩm</Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/productsManagement")}
                sx={{ mt: 2 }}
              >
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Danh mục</Typography>
              <Typography variant="h4">{stats.categories} danh mục</Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/categoriesManagement")}
                sx={{ mt: 2 }}
              >
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Người dùng</Typography>
              <Typography variant="h4">{stats.users} người dùng</Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/usersManagement")}
                sx={{ mt: 2 }}
              >
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Đơn hàng</Typography>
              <Typography variant="h4">
                {stats.orders} đơn hàng ({stats.pendingOrders} chưa thanh toán)
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/ordersManagement")}
                sx={{ mt: 2 }}
              >
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chatbot</Typography>
              <Typography variant="h4">{stats.reviews} tin nhắn</Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/chatbotManagement")}
                sx={{ mt: 2 }}
              >
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </DashboardLayoutWrapper>
  );
};

export default Admin;
