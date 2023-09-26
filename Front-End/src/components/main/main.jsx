import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { AddShoppingCartOutlined, Close } from "@mui/icons-material";

import { useGetproductByNameQuery } from "../../redux/product";
import ProductDetails from "./ProductDetails";

const Main = () => {
  // const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newValue) => {
    if (newValue !== null) {
      setmyDate(newValue);
    }
    setmyDate(newValue);
  };
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //filter dara men and women and all products
  const allProductsAPI = "products?populate=*";

  const menCategoryAPI =
    "products?populate=*&filters[productCategory][$eq]=Men";

  const womenCategoryAPI =
    "products?populate=*&filters[productCategory][$eq]=Women";

  const [myDate, setmyDate] = useState(allProductsAPI);
  const { data, error, isLoading } = useGetproductByNameQuery(myDate);
  const [clickedProduct, setclickedProduct] = useState({});

  if (isLoading) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {
            // @ts-ignore
            error.error
          }
        </Typography>

        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  }

  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6"> Selected Product</Typography>
            <Typography fontWeight={300} variant="body1">
              All Our Arrivals In a Exclusive Brand selection
            </Typography>
          </Box>
          <ToggleButtonGroup
            color="error"
            value={myDate}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid rgba(233, 69, 96, 0.5) !important",
                color: "#e94560",
                backgroundColor: "initial",
              },
            }}
          >
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={allProductsAPI}
              aria-label="left aligned"
            >
              All Product
            </ToggleButton>

            <ToggleButton
              sx={{ mx: "16px !important", color: theme.palette.text.primary }}
              className="myButton"
              value={menCategoryAPI}
              aria-label="centered"
            >
              MEN Category
            </ToggleButton>
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={womenCategoryAPI}
              aria-label="right aligned"
            >
              Women Category
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data.data.map((item) => {
            return (
              <Card
                key={item.id}
                sx={{
                  maxWidth: 333,
                  mt: 6,
                  ":hover .MuiCardMedia-root ": {
                    rotate: "1deg",
                    scale: "1.1",
                    transition: "0.35s",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 277 }}
                  image={`${process.env.REACT_APP_BASE_URL}${item.attributes.productimg.data[0].attributes.url}`}
                />

                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.attributes.productTitle}
                    </Typography>

                    <Typography variant="subtitle1" component="p">
                      {item.attributes.productPrice}$
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.attributes.productDescription}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={() => {
                      handleClickOpen();
                      setclickedProduct(item);
                    }}
                    sx={{ textTransform: "capitalize" }}
                  >
                    <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="large" />
                    Add To Cart
                  </Button>
                  <Button size="small">
                    <Rating
                      precision={0.1}
                      name="read-only"
                      value={item.attributes.productRating}
                      readOnly
                    />
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Stack>

        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            sx={{
              ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
              position: "absolute",
              top: 0,
              right: 10,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>

          <ProductDetails clickedProduct={clickedProduct} />
        </Dialog>
      </Container>
    );
  }
};
export default Main;
