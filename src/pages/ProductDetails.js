import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Button, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Review from "../components/Review";
import AddedProductToCart from "../components/AddedProductToCart";
import { GET_CART_DATA_BY_USER_RESET } from "../constants/userConstants";
import {
  getProductDetails,
  getCartDataByUser,
  getSellerById,
  addToCart,
  addToMyCollection,
  getUserById,
  likeProduct,
  getUserProfile,
} from "../redux/actions/userAction";

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      maxHeight: "80%",
    },
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
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [prodQty, setProdQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [reviews, setReviews] = useState([]);
  // const [likes, setLikes] = useState([]);

  const usergetProductDetails = useSelector(
    (state) => state.userGetProductDetails
  );
  const userGetSellerById = useSelector((state) => state.userGetSellerById);
  const userProfile = useSelector((state) => state.userProfile);
  const userAddToCart = useSelector((state) => state.userAddToCart);
  const userAddToMyCollection = useSelector(
    (state) => state.userAddToMyCollection
  );
  const userGetUserById = useSelector((state) => state.userGetUserById);
  const userLikeProduct = useSelector((state) => state.userLikeProduct);

  const { userInfo } = userGetUserById;
  const { user } = userProfile;
  const { sellerInfo } = userGetSellerById;
  const { prodInfo } = usergetProductDetails;
  const { cartData, loading: cartLoading } = userAddToCart;
  const { myCollectionData } = userAddToMyCollection;
  const { success } = userLikeProduct;
  const prodId = params.prodId;

  const token = JSON.parse(localStorage.getItem("userInfo"));

  // const [anonyCartData, setAnonyCartData] = useState([
  //   {
  //     quantity: prodQty,
  //     product: prodInfo?.id,
  //     price: prodInfo?.price,
  //     totalAmount: prodInfo?.price * prodQty,
  //   },
  // ]);

  const [anonyCartData, setAnonyCartData] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    dispatch(getCartDataByUser());
  }, [cartData]);

  useEffect(() => {
    dispatch(getProductDetails(prodId));
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    // setLikes(false);
    setIsLiked(false);
    if (prodInfo && user) {
      prodInfo["likes"].map((item) => {
        if (item.owner === user.id) {
          setIsLiked(true);
        }
      });
    }
  }, [prodInfo]);

  useEffect(() => {
    setIsLiked(false);
  }, [location]);

  useEffect(() => {
    if (success) {
      dispatch(getProductDetails(prodId));
    }
  }, [success]);

  useEffect(() => {
    if (prodInfo) {
      dispatch(getSellerById(prodInfo["seller_id"]));
    }
  }, [dispatch, prodInfo]);

  useEffect(() => {
    if (prodInfo) {
      setReviews(prodInfo["reviews"]);
      // setLikes(prodInfo["likes"]);
      if (prodInfo["reviews"]?.length >= 1) {
        prodInfo["reviews"].map((item) => {
          dispatch(getUserById(item.owner));
        });
      }
    }
  }, [prodInfo]);

  useEffect(() => {
    setInterval(() => {
      if (myCollectionData) {
        setShowAlert(false);
      }
    }, 3000);
  }, [myCollectionData, showAlert]);

  const handleClose = () => setOpen(false);

  const incrementQtyHandler = () => {
    setProdQty((prevState) => prevState + 1);
  };

  const decrementQtyHandler = () => {
    if (prodQty > 1) {
      setProdQty((prevState) => prevState - 1);
    }
  };

  const addToCartHandler = () => {
    let cart = {
      quantity: prodQty,
      product: prodInfo["id"],
      price: prodInfo["price"],
      totalAmount: prodInfo["price"] * prodQty,
    };

    if (token) {
      dispatch(addToCart(cart));

      if (!cartLoading) {
        setOpen(true);
        dispatch({ type: GET_CART_DATA_BY_USER_RESET });
        dispatch(getCartDataByUser());
      }
    } else {
      // navigate("/login");
      // setAnonyCartData([...anonyCartData, cart]);
      setAnonyCartData((prevState) => [...prevState, cart]);
      console.log(anonyCartData);
      window.localStorage.setItem("cart", JSON.stringify(anonyCartData));
    }
  };

  const addToMyCollectionHandler = () => {
    const collection = {
      product: prodInfo["id"],
    };

    dispatch(addToMyCollection(collection));
    setShowAlert(true);
  };

  const likeProductHandler = () => {
    const product = {
      product: prodInfo["id"],
    };
    if (token) {
      setIsLiked(true);
      dispatch(likeProduct(product));
    } else {
      navigate("/login");
    }
  };

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
      {showAlert && (
        <Alert severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Success</AlertTitle>
          {myCollectionData}
        </Alert>
      )}

      <Container className={classes.root}>
        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            lg={6}
            md={6}
            sx={{
              [theme.breakpoints.down("md")]: {
                textAlign: "center",
              },
            }}
          >
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
          <Grid item xs={12} lg={6} md={6}>
            <Grid
              container
              style={{
                fontSize: 25,
              }}
            >
              <Grid
                item
                xs={6}
                justifyContent="center"
                style={{ fontWeight: "bold" }}
              >
                {prodInfo && prodInfo["name"]}
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right", fontSize: 20 }}>
                <Button
                  style={{ color: "#000000" }}
                  onClick={likeProductHandler}
                >
                  <FavoriteIcon
                    style={{
                      color: isLiked ? "red" : "#7A7B7F",
                      marginRight: "2%",
                      marginTop: "2%",
                    }}
                  />
                  {prodInfo && prodInfo["likes"]?.length}
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>BY {sellerInfo && sellerInfo["shop_name"]}</div>
              <div>
                <Button
                  style={{ color: "inherit", textDecoration: "underline" }}
                  onClick={addToMyCollectionHandler}
                >
                  Add to Collection
                </Button>
              </div>
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
            <Grid item xs={12} style={{ marginTop: "7%" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#745D3E", width: "100%" }}
                onClick={addToCartHandler}
              >
                {cartLoading && "Loading...."}
                {!cartLoading && "Add to Cart"}
              </Button>
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
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} lg={6} md={6}>
            {reviews?.length > 0 && (
              <Grid item xs={12} style={{ fontSize: 25 }}>
                Reviews
              </Grid>
            )}
            {reviews &&
              reviews.map((item) => {
                return (
                  <Review
                    reviews={reviews}
                    key={item.id}
                    owner={item.owner}
                    userInfo={userInfo}
                  />
                );
              })}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
