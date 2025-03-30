import { Container, Grid, Stack } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "../../components/ProductDetail/ProductImage";
import ProductTitle from "../../components/ProductDetail/ProductTitle";
import ProductPrice from "../../components/ProductDetail/ProductPrice";
import ProductStockKeepingUnit from "../../components/ProductDetail/ProductStockKeepingUnit";
import ProductBrand from "../../components/ProductDetail/ProductBrand";
import ProductColorSection from "../../components/ProductDetail/ProductColorSection";
import ProductQuantitySelection from "../../components/ProductDetail/ProductQuantitySelection";
import ProductSizeSelection from "../../components/ProductDetail/ProductSizeSelection";
import ProductActions from "../../components/ProductDetail/ProductActions";

const API_URL = "https://dummyjson.com/products";

const buttonOptionSizes = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSelectColor = (color) => {
    setColors(color);
  };

  const handleSelectSize = (size) => {
    setSizes(size);
  };

  useEffect(() => {
    console.log("Fetching product...");
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Product data:", data);
        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Stack sx={{ m: "80px 0" }}>
          <Grid container spacing={4}>
            <Grid item xl={6} lg={6}>
              <ProductImage products={products} loading={loading} />
            </Grid>

            <Grid item xl={6} lg={6}>
              <ProductTitle products={products} loading={loading} />

              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ m: "30px 0" }}
              >
                <ProductPrice products={products} loading={loading} />
              </Stack>

              <ProductStockKeepingUnit products={products} loading={loading} />
              <ProductBrand />
              <ProductColorSection
                products={products}
                loading={loading}
                colors={colors}
                handleSelectColor={handleSelectColor}
              />
              <ProductQuantitySelection
                products={products}
                loading={loading}
                quantity={quantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
              />
              <ProductSizeSelection
                products={products}
                loading={loading}
                sizes={sizes}
                buttonOptionSizes={buttonOptionSizes}
                handleSelectSize={handleSelectSize}
              />
              <ProductActions products={products} loading={loading} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <Footer />)
    </>
  );
};

export default ProductDetails;
