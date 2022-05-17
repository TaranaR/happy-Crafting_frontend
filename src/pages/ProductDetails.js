import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {
  getProductDetails,
  getCartDataByUser,
  getSellerById,
  addToCart,
} from "../redux/actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Button, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Review from "../components/Review";
import AddedProductToCart from "../components/AddedProductToCart";
import { GET_CART_DATA_BY_USER_RESET } from "../constants/userConstants";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "5vh",
  },
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 10,
    width: "30%",
    //height: "65%",
    maxHeight: "75%",
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
}));

export default function ProductDetails() {
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [prodQty, setProdQty] = useState(1);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const usergetProductDetails = useSelector(
    (state) => state.userGetProductDetails
  );
  const userGetSellerById = useSelector((state) => state.userGetSellerById);
  const userProfile = useSelector((state) => state.userProfile);
  const userAddToCart = useSelector((state) => state.userAddToCart);
  const { user } = userProfile;
  const { sellerInfo } = userGetSellerById;
  const { prodInfo } = usergetProductDetails;
  const { cartData, loading: cartLoading } = userAddToCart;
  const prodId = params.prodId;
  let reviews = [];
  let likeBtn = "";

  const token = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(getCartDataByUser());
  }, [cartData]);

  useEffect(() => {
    dispatch(getProductDetails(prodId));
    //dispatch(getCartDataByUser());
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [dispatch]);

  useEffect(() => {
    if (prodInfo) {
      dispatch(getSellerById(prodInfo["seller_id"]));
    }
  }, [dispatch, prodInfo]);

  useEffect(() => {
    if (prodInfo) {
      if (prodInfo["reviews"].length >= 1) {
        setIsLiked(true);
      }
    }
  }, [dispatch, prodInfo]);

  const handleClose = () => setOpen(false);

  const incrementQtyHandler = () => {
    setProdQty((prevState) => prevState + 1);
  };

  const decrementQtyHandler = () => {
    if (prodQty > 1) {
      setProdQty((prevState) => prevState - 1);
    }
  };

  const likeHandler = () => {
    if (token) {
      setIsLiked((prevState) => !prevState);
    } else {
      navigate("/login");
    }
  };

  const addToCartHandler = () => {
    if (token) {
      const cart = {
        quantity: prodQty,
        product: prodInfo["id"],
      };
      // if (!cartData) {
      dispatch(addToCart(cart));

      //setInterval(() => setOpen(true), 700);
      if (!cartLoading) {
        setOpen(true);
        dispatch({ type: GET_CART_DATA_BY_USER_RESET });
        dispatch(getCartDataByUser());
      }
    } else {
      navigate("/login");
    }
  };

  if (prodInfo) {
    reviews = prodInfo["reviews"];
  }

  return (
    <Fragment>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <AddedProductToCart
              cartData={cartData}
              prodInfo={prodInfo}
              qty={prodQty}
            />
          </Box>
        </Modal>
      )}
      <Container className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            {prodInfo && (
              <img
                src={prodInfo["image"]}
                style={{
                  width: "90%",
                  height: "80%",
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
                <Button style={{ color: "#000000" }} onClick={likeHandler}>
                  <FavoriteIcon
                    style={{
                      // color: isLiked ? "red" : "#7A7B7F",
                      color:
                        reviews.length > 0
                          ? "red"
                          : isLiked
                          ? "red"
                          : "#7A7B7F",
                      marginRight: "2%",
                      marginTop: "2%",
                      //border: "1px solid red",
                    }}
                  />
                  {prodInfo && prodInfo["reviews"].length}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              BY {sellerInfo && sellerInfo["shop_name"]}
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "6%",
                color: "#237E39",
              }}
            >
              ₹{prodInfo && prodInfo["price"]}
            </Grid>

            <Grid item xs={12} style={{ marginTop: "7%", fontSize: 20 }}>
              Size
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2%", fontSize: 15 }}>
              {prodInfo && prodInfo["size"]}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "7%", fontSize: 20 }}>
              Color
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2%", fontSize: 15 }}>
              {prodInfo && (
                <div
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 25,
                    border: "1px solid black",
                    background: `${prodInfo["color"]}`,
                  }}
                ></div>
              )}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "7%", fontSize: 20 }}>
              About Product
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2%", fontSize: 15 }}>
              {prodInfo && (
                <div
                  dangerouslySetInnerHTML={{ __html: prodInfo["description"] }}
                ></div>
              )}
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10%", fontSize: 20 }}>
              Quantity
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2%" }}>
              <Box
                style={{
                  width: "100%",
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
                    marginLeft: "10px",
                  }}
                  value={prodQty}
                />

                <Button
                  onClick={incrementQtyHandler}
                  style={{ color: "#000000", marginLeft: "10px" }}
                >
                  +
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10%" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#745D3E", width: "100%" }}
                onClick={addToCartHandler}
              >
                {cartLoading && "Loading...."}
                {!cartLoading && "Add to Cart"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            {reviews.length > 0 && (
              <Grid item xs={12} style={{ fontSize: 25 }}>
                Reviews
              </Grid>
            )}

            {reviews &&
              reviews.map((item) => {
                return <Review item={item} key={item.id} />;
              })}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
