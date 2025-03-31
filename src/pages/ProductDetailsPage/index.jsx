import { Container, Grid, Stack } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "./shared/ProductImage";
import ProductTitle from "./shared/ProductTitle";
import ProductPrice from "./shared/ProductPrice";
import ProductStockKeepingUnit from "./shared/ProductStockKeepingUnit";
import ProductBrand from "./shared/ProductBrand";
import ProductColorSection from "./shared/ProductColorSection";
import ProductQuantitySelection from "./shared/ProductQuantitySelection";
import ProductSizeSelection from "./shared/ProductSizeSelection";
import ProductActions from "./shared/ProductActions";
import axios from "axios";

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
        const response = await axios.get(`${API_URL}/${id}`, { signal });
        setProducts(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request aborted!");
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
              <ProductActions
                products={products}
                loading={loading}
                selectedQuantity={quantity}
                selectedColor={colors}
                selectedSize={sizes}
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
