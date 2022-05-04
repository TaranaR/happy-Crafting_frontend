import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails, getSellerById } from "../redux/actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Button, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "10vh",
    //border: "1px solid black",
  },
}));

export default function ProductDetails() {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [prodQty, setProdQty] = useState(0);
  const usergetProductDetails = useSelector(
    (state) => state.userGetProductDetails
  );
  const userGetSellerById = useSelector((state) => state.userGetSellerById);
  const { sellerInfo } = userGetSellerById;
  const { prodInfo } = usergetProductDetails;
  const prodId = params.prodId;
  let qty;

  useEffect(() => {
    dispatch(getProductDetails(prodId));

    if (prodInfo) {
      console.log("hello");
      dispatch(getSellerById(prodInfo["seller_id"]));
    }
  }, [dispatch]);

  //   prodInfo && console.log(prodInfo);
  //   sellerInfo && console.log("Seller", sellerInfo);

  const incrementQtyHandler = () => {
    setProdQty((prevState) => prevState + 1);
  };

  const decrementQtyHandler = () => {
    if (prodQty > 0) {
      setProdQty((prevState) => prevState - 1);
    }
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            {prodInfo && (
              <img
                src={prodInfo["image"]}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              style={{
                fontSize: 25,
              }}
            >
              <Grid item xs={6} justifyContent="center">
                {prodInfo && prodInfo["name"]}
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right", fontSize: 20 }}>
                <FavoriteIcon
                  style={{
                    color: "red",
                    marginRight: "2%",
                    marginTop: "2%",
                    //border: "1px solid red",
                  }}
                />
                {prodInfo && prodInfo["reviews"].length}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              BY {sellerInfo && sellerInfo["shop_name"]}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10%", color: "#237E39" }}>
              ₹{prodInfo && prodInfo["price"]}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10%", fontSize: 20 }}>
              About Product
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2%", fontSize: 15 }}>
              {prodInfo && prodInfo["description"]}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10%", fontSize: 20 }}>
              Quantity
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2%" }}>
              <Box
                style={{
                  //   border: "1px solid grey",
                  //   borderRadius: 5,
                  width: "23vh",
                }}
              >
                <Button
                  onClick={decrementQtyHandler}
                  style={{ color: "#000000" }}
                >
                  -
                </Button>
                <TextField
                  variant="outlined"
                  size="small"
                  style={{
                    width: "50px",
                    border: "none",
                  }}
                  value={prodQty}
                />

                <Button
                  onClick={incrementQtyHandler}
                  style={{ color: "#000000" }}
                >
                  +
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10%" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#745D3E", width: "100%" }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={6} style={{ fontSize: 25 }}>
            Reviews
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
